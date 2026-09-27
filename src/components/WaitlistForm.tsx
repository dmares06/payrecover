"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      // silently fail for MVP
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p className="text-emerald-300 text-lg">
        You're on the list! We'll be in touch soon.
      </p>
    );
  }

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        required
        className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
      <button
        type="submit"
        className="bg-white text-emerald-900 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors whitespace-nowrap"
      >
        Join Waitlist
      </button>
    </form>
  );
}