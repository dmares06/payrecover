import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <header className="border-b border-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PR</span>
            </div>
            <span className="font-semibold text-lg text-indigo-900">
              PayRecover
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm text-gray-600 hover:text-indigo-700"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-gray-600 hover:text-indigo-700"
            >
              Pricing
            </Link>
            <a
              href="#waitlist"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Early Access
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full mb-6">
          🚀 Built for Agencies &amp; Service Businesses
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Stop Losing Revenue to Late Payments.
          <br />
          <span className="text-indigo-600">
            Get Paid in Days, Not Months.
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          PayRecover connects to your invoicing system and sends smart,
          personalized follow-ups to late-paying clients — in your firm&apos;s
          voice, on the right schedule, across email and SMS. No awkward
          conversations. No overdue invoices falling through the cracks.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl text-lg font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Join the Waitlist
          </a>
          <a
            href="#how-it-works"
            className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl text-lg font-medium hover:bg-gray-50 transition-all"
          >
            How It Works
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500">
            Used by agencies, consultancies, and service businesses recovering
            millions in late payments
          </p>
          <div className="flex items-center gap-8 text-gray-400 text-xs font-medium">
            <span>📊 97% of agencies deal with late payments</span>
            <span>💰 $17.5K avg owed per business</span>
            <span>⚡ 58% of invoices paid late in 2025</span>
          </div>
        </div>
      </section>

      {/* Problem / Pain */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Late payments aren&apos;t an inconvenience — they&apos;re a leak in
          your cash flow
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
          You deliver the work, send the invoice, and wait. Meanwhile payroll
          doesn&apos;t wait, vendors don&apos;t wait, and growth doesn&apos;t
          wait.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              stat: "97%",
              label: "of agencies deal with late client payments regularly",
              icon: "📊",
              source: "Ignition 2025 Agency Report",
            },
            {
              stat: "58%",
              label: "of digital media payments were late in H1 2025",
              icon: "💰",
              source: "OAREX Payments Study",
            },
            {
              stat: "11 hrs",
              label: "per month lost by agencies chasing invoices manually",
              icon: "⏰",
              source: "Industry Benchmark",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {item.stat}
              </div>
              <div className="text-gray-600 mb-1">{item.label}</div>
              <div className="text-xs text-gray-400">{item.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
          Set it up once. Never chase an invoice again.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Connect your billing",
              desc: "Link QuickBooks, Xero, or Stripe in one click. We read your open invoices, never your bank.",
            },
            {
              step: "2",
              title: "AI learns your voice",
              desc: "We analyze your past client communications to match your firm&apos;s tone and style perfectly.",
            },
            {
              step: "3",
              title: "Set your escalation rules",
              desc: "When to follow up, how often, which channels, and how firm each stage gets.",
            },
            {
              step: "4",
              title: "Cash flow runs itself",
              desc: "AI sends personalized reminders on autopilot. You get notified when money hits your account.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Everything an agency needs to get paid on time
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
            From first reminder to final escalation — automated, professional,
            and on-brand.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Escalation Sequence",
                desc: "Friendly nudge → gentle reminder → firm notice → final escalation. AI escalates automatically based on days overdue.",
              },
              {
                title: "Brand-Matched Voice",
                desc: "We train on your firm&apos;s past client emails. Every message sounds like your team wrote it — not a collections robot.",
              },
              {
                title: "Multi-Channel Outreach",
                desc: "Email + SMS + WhatsApp. Follow up wherever your clients actually respond. One sequence, every channel covered.",
              },
              {
                title: "Payment Predictions",
                desc: "AI flags which invoices are likely to be late before they are. Get ahead of the problem, not behind it.",
              },
              {
                title: "Cash Flow Dashboard",
                desc: "See every open invoice, days overdue, follow-up history, and DSO at a glance. No spreadsheets required.",
              },
              {
                title: "Approval Before Send",
                desc: "Every message previews before it goes out. Approve or edit in one click. Full control, zero risk.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Agency pricing. Enterprise results.
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
            Less than what one hour of manual chasing costs you. Recovers
            thousands in locked-up revenue.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900">Starter</h3>
              <p className="text-sm text-gray-500 mb-4">
                For solo operators and micro-agencies
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  "Up to 100 invoices/month",
                  "AI follow-up sequences",
                  "Email + SMS reminders",
                  "Brand voice training",
                  "Review before send",
                  "Cash flow dashboard",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <span className="text-indigo-600">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth — featured */}
            <div className="bg-white rounded-xl p-8 border-2 border-indigo-500 shadow-lg shadow-indigo-100 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Growth</h3>
              <p className="text-sm text-gray-500 mb-4">
                For growing agencies and teams
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  "Unlimited invoices",
                  "Everything in Starter",
                  "WhatsApp follow-ups",
                  "Payment predictions",
                  "Team access (5 users)",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <span className="text-indigo-600">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Scale */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900">Scale</h3>
              <p className="text-sm text-gray-500 mb-4">
                For multi-location firms and agencies
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$199</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  "Everything in Growth",
                  "Multi-currency support",
                  "White-label reports",
                  "API access",
                  "Unlimited team members",
                  "Dedicated account manager",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <span className="text-indigo-600">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="bg-indigo-900 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Early Access
          </h2>
          <p className="text-indigo-200 mb-8">
            We&apos;re launching soon. Join the waitlist and get 50% off your
            first 3 months.
          </p>
          <WaitlistForm />
          <p className="text-indigo-400 text-xs mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">PR</span>
              </div>
              <span className="text-gray-400 text-sm">PayRecover</span>
            </div>
            <p className="text-gray-600 text-xs">
              &copy; 2026 PayRecover. Built for agencies who do the work.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}