#!/usr/bin/env python3
"""PayRecover lead sourcing — find small agencies with public contact emails.

Searches Google for agency sites in target verticals, extracts contact emails
from their sites, and builds a CRM-ready CSV.

Usage:
    python3 leads.py --query "small digital marketing agency" --limit 50 --out leads.csv

Output columns: company, website, email, phone, city, state, found_at
"""

import argparse
import csv
import json
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
PHONE_RE = re.compile(
    r"(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}"
)


@dataclass
class Lead:
    company: str = ""
    website: str = ""
    email: str = ""
    phone: str = ""
    city: str = ""
    state: str = ""
    found_at: str = ""

    def to_row(self):
        return [
            self.company,
            self.website,
            self.email,
            self.phone,
            self.city,
            self.state,
            self.found_at,
        ]


FIELD_NAMES = ["company", "website", "email", "phone", "city", "state", "found_at"]


def search_google(query: str, limit: int = 20) -> list[str]:
    """Find agency websites via web search (uses Hermes web_search through CLI fallback or direct fetch)."""
    urls = []
    try:
        # Use Google's public results via the DuckDuckGo HTML endpoint (no API key)
        q = urllib.parse.quote(query)
        url = f"https://html.duckduckgo.com/html/?q={q}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
        # Extract result links
        for m in re.finditer(r'result__a[^>]*href="([^"]+)"', html):
            link = urllib.parse.unquote(m.group(1))
            # strip duckduckgo redirect
            if "uddg=" in link:
                link = urllib.parse.parse_qs(
                    urllib.parse.urlparse(link).query
                ).get("uddg", [link])[0]
            if "http" in link and "duckduckgo" not in link:
                urls.append(link)
        return urls[:limit]
    except Exception as e:
        print(f"[search] error: {e}", file=sys.stderr)
        return urls


def fetch_page(url: str, timeout: int = 12) -> Optional[str]:
    try:
        req = urllib.request.Request(
            url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            ctype = resp.headers.get("Content-Type", "")
            if "html" not in ctype:
                return None
            data = resp.read().decode("utf-8", errors="ignore")
            return data[:500_000]  # cap
    except Exception:
        return None


def extract_emails(html: str) -> list[str]:
    emails = set()
    for e in EMAIL_RE.findall(html):
        # filter obvious junk
        if any(
            junk in e.lower()
            for junk in ["example", "sentry", "wixpress", "domain.com", "schema.org", ".png", ".jpg", ".gif", "2x", "@2x"]
        ):
            continue
        if e.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg")):
            continue
        emails.add(e.lower())
    return list(emails)


def extract_phones(html: str) -> list[str]:
    phones = set()
    for p in PHONE_RE.findall(html):
        if len(re.sub(r"\D", "", p)) >= 10:
            phones.add(p.strip())
    return list(phones)


def extract_location(html: str, company: str = "") -> str:
    """Weak heuristic: look for 'City, ST' patterns."""
    import re as _re

    m = _re.search(r"\b([A-Z][a-zA-Z]+),\s*([A-Z]{2})\b", html)
    if m:
        return f"{m.group(1)}, {m.group(2)}"
    return ""


def process_website(url: str) -> Optional[Lead]:
    html = fetch_page(url)
    if not html:
        return None
    emails = extract_emails(html)
    phones = extract_phones(html)
    loc = extract_location(html)
    if not emails and not phones:
        # try /contact
        contact_url = url.rstrip("/") + "/contact"
        html2 = fetch_page(contact_url)
        if html2:
            emails = extract_emails(html2)
            phones = extract_phones(html2)
            if not loc:
                loc = extract_location(html2)
    # only keep leads with at least an email OR phone — those are actionable
    if not emails and not phones:
        return None
    company = re.sub(r"^www\.", "", urllib.parse.urlparse(url).netloc).split(".")[0].replace("-", " ").title()
    return Lead(
        company=company,
        website=url,
        email=emails[0] if emails else "",
        phone=phones[0] if phones else "",
        city=loc.split(",")[0].strip() if loc else "",
        state=loc.split(",")[1].strip() if loc else "",
        found_at=datetime.now().isoformat(),
    )


def main():
    parser = argparse.ArgumentParser(description="PayRecover lead sourcing")
    parser.add_argument("--query", default="small digital marketing agency", help="Search query")
    parser.add_argument("--limit", type=int, default=20, help="Max websites to search")
    parser.add_argument("--out", default="leads.csv", help="Output CSV path")
    args = parser.parse_args()

    print(f"[1/3] Searching: '{args.query}' (limit {args.limit})...")
    urls = search_google(args.query, args.limit)
    print(f"[1/3] Found {len(urls)} URLs")

    leads: list[Lead] = []
    seen = set()
    print(f"[2/3] Scraping {len(urls)} sites for contacts...")
    for i, url in enumerate(urls, 1):
        domain = urllib.parse.urlparse(url).netloc
        if domain in seen or not domain:
            continue
        seen.add(domain)
        lead = process_website(url)
        if lead:
            leads.append(lead)
            print(f"[2/3]  + {lead.company} ({lead.email or lead.phone or 'no contact'})")
        time.sleep(0.3)  # polite delay
        if i % 10 == 0:
            print(f"[2/3]  ...{i}/{len(urls)}")

    print(f"[3/3] Writing {len(leads)} leads to {args.out}")
    with open(args.out, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(FIELD_NAMES)
        for lead in leads:
            writer.writerow(lead.to_row())

    print(f"Done. {len(leads)} leads saved to {args.out}")
    if not leads:
        print("Tip: try a different query or raise --limit")


if __name__ == "__main__":
    main()