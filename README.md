# PayRecover — AI Invoice Chasing for Freelancers

Stop chasing late payments. PayRecover connects to your invoicing tool and
sends smart, personalized follow-up reminders to late-paying clients.

## What's built so far

- Landing page (features, pricing, waitlist)
- Waitlist API (in-memory — hooks up to Supabase when you're ready)
- AI follow-up engine (generates personalized reminders in the owner's voice)
- Stripe integration scaffolding (needs your keys to activate)
- Supabase scaffolding (needs your project to persist data)

## What you need to do

### 1. Supabase (free)

1. Go to https://supabase.com and create a free project
2. Copy the **Project URL** and **anon public key**
3. Put them in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Stripe (free to create)

1. Create a Stripe account at https://stripe.com
2. Copy your **Secret Key** and **Publishable Key**
3. Create 3 products in Stripe Dashboard (Solo $29, Pro $49, Agency $99)
4. Copy the Price IDs
5. Put them in `.env.local`:

```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_SOLO=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_AGENCY=price_...
```

### 3. OpenRouter (free credits available)

1. Go to https://openrouter.ai and sign up
2. Create an API key
3. Put it in `.env.local`:

```
OPENROUTER_API_KEY=sk-or-v1-...
```

### 4. Domain ($12/year — from the $100 budget)

1. Buy a domain (e.g. payrecover.com) from Namecheap or Cloudflare
2. Connect it to Vercel

## Deploy

```bash
npx vercel --prod
```

## Growth path to $10K/mo in 90 days

| Month | Customers | Pricing | Revenue | Action |
|-------|-----------|---------|---------|--------|
| Month 1 | 0-50 | Waitlist + free trials | $0 | Build + inbound |
| Month 2 | 50-150 | $49 avg/mo | $2.5K-$7.5K | Direct outreach |
| Month 3 | 150-250 | $49 avg/mo | $7.5K-$12K | Scale outreach |

### Distribution channels (I handle these):
- **SEO content**: Blog posts targeting "invoice chasing," "late payment automation," "freelancer payment tools"
- **Reddit**: r/freelance, r/smallbusiness, r/webdev — answer payment questions, soft-link
- **Cold email**: Scrape freelancer directories and reach out
- **Product Hunt**: Launch on launch day
- **Indie Hackers**: Build-in-public threads