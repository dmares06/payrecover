"use client";

import { useState } from "react";

export default function DemoGenerator() {
  const [clientName, setClientName] = useState("Acme Construction");
  const [amount, setAmount] = useState("4500");
  const [daysOverdue, setDaysOverdue] = useState("14");
  const [tone, setTone] = useState<"friendly" | "firm" | "urgent">("firm");
  const [channel, setChannel] = useState<"email" | "sms">("email");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    subject?: string;
    body: string;
    channel: string;
  } | null>(null);
  const [error, setError] = useState("");

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Try the API first; fall back to client-side template if API not configured
      try {
        const res = await fetch("/api/generate-followup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientName,
            invoiceAmount: parseFloat(amount) || 0,
            daysOverdue: parseInt(daysOverdue) || 0,
            tone,
            channel,
            invoiceNumber: "1042",
            ownerName: "Sarah",
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setResult(data.message);
          setLoading(false);
          return;
        }
      } catch {
        // fall through to local
      }

      // Local fallback (mirrors lib/ai.ts fallback)
      const amt = parseFloat(amount) || 0;
      const days = parseInt(daysOverdue) || 0;
      const templates: Record<string, string> = {
        friendly: `Hey ${clientName}, just a quick nudge on invoice #1042 for $${amt.toFixed(
          2
        )}. Wanted to make sure it landed okay. Let me know if anything's needed! — Sarah`,
        firm: `Hi ${clientName}, following up on invoice #1042 ($${amt.toFixed(
          2
        )}) which is now ${days} days overdue. Could you let me know when to expect payment? Thanks, Sarah`,
        urgent: `${clientName}, invoice #1042 for $${amt.toFixed(
          2
        )} is now ${days} days overdue. Please remit payment by end of week to avoid late fees. Thanks, Sarah`,
      };
      const body = templates[tone];
      setResult({
        subject: channel === "email" ? `Quick follow-up on invoice #1042` : undefined,
        body: channel === "sms" && body.length > 160 ? body.slice(0, 157) + "..." : body,
        channel,
      });
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
        See it work — generate a live follow-up
      </h3>
      <form onSubmit={generate} className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client name
          </label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Invoice amount ($)
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Days overdue
          </label>
          <input
            value={daysOverdue}
            onChange={(e) => setDaysOverdue(e.target.value)}
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel
          </label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value as "email" | "sms")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="email">Email</option>
            <option value="sms">SMS / Text</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tone
          </label>
          <div className="flex gap-2">
            {(
              [
                ["friendly", "Friendly nudge"],
                ["firm", "Polite but firm"],
                ["urgent", "Escalation"],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setTone(val)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm border transition-colors ${
                  tone === val
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Follow-Up"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {channel === "email" ? "Email draft" : "SMS draft"}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(result.body)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Copy
            </button>
          </div>
          {result.subject && (
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Subject: {result.subject}
            </p>
          )}
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{result.body}</p>
        </div>
      )}
      <p className="text-xs text-gray-400 text-center mt-4">
        Demo uses sample data. Connect your invoicing to generate real
        follow-ups automatically.
      </p>
    </div>
  );
}