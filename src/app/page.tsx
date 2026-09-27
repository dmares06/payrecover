import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <header className="border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PR</span>
            </div>
            <span className="font-semibold text-lg text-emerald-900">
              PayRecover
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm text-gray-600 hover:text-emerald-700"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-gray-600 hover:text-emerald-700"
            >
              Pricing
            </Link>
            <a
              href="#waitlist"
              className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Join Waitlist
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full mb-6">
          🚀 AI-Powered Payment Recovery
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Stop Chasing Late Payments.
          <br />
          <span className="text-emerald-600">Get Paid Automatically.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          PayRecover connects to your invoicing tool and sends smart,
          personalized follow-up reminders to late-paying clients — in your
          voice, on the right schedule, across email and SMS. You focus on work,
          we handle the awkward.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl text-lg font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
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
            Built for freelancers, agencies, and service businesses
          </p>
          <div className="flex items-center gap-8 text-gray-400 text-xs font-medium">
            <span>⚡ 47% of invoices are paid late</span>
            <span>💰 $17.5K avg owed per business</span>
            <span>⏱️ 3-5 hrs/week wasted chasing</span>
          </div>
        </div>
      </section>

      {/* Problem / Pain */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Late payments are killing your cash flow
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
          You delivered the work. You sent the invoice. Then silence. Sound
          familiar?
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              stat: "56%",
              label: "of small businesses are owed money right now",
              icon: "📊",
            },
            {
              stat: "$17,500",
              label: "average owed per business in unpaid invoices",
              icon: "💰",
            },
            {
              stat: "3-5 hrs",
              label: "per week wasted on manual follow-ups",
              icon: "⏰",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {item.stat}
              </div>
              <div className="text-gray-600">{item.label}</div>
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
          Two minutes to set up. Zero awkward conversations ever again.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Connect your invoicing",
              desc: "Link Stripe, QuickBooks, or Xero in one click. We read your invoices, never your bank.",
            },
            {
              step: "2",
              title: "AI learns your voice",
              desc: "We analyze your past emails and build a writing style that sounds exactly like you.",
            },
            {
              step: "3",
              title: "Set your rules",
              desc: "When to follow up, how often, which channels (email/SMS), and escalation timing.",
            },
            {
              step: "4",
              title: "Get paid faster",
              desc: "AI sends personalized reminders on autopilot. You get notified when money lands.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
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
            Everything you need to get paid
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
            No more awkward "just checking in" emails. No more 10 PM spreadsheet
            sessions.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Escalation",
                desc: "Friendly nudge → gentle reminder → firm notice. AI knows when to turn up the heat, automatically.",
              },
              {
                title: "Your Voice, Not a Robot",
                desc: "We train on your past emails. Every message sounds like you wrote it — because the AI learned from you.",
              },
              {
                title: "Multi-Channel",
                desc: "Email + SMS + WhatsApp. Follow up wherever your clients actually respond.",
              },
              {
                title: "Payment Predictions",
                desc: "AI predicts which invoices will be late before they are. Get ahead of the problem.",
              },
              {
                title: "Dashboard & Reports",
                desc: "See exactly who owes what, follow-up history, and your Days Sales Outstanding at a glance.",
              },
              {
                title: "Review Before Sending",
                desc: "Every message previewed before it goes out. Approve or edit in one click. Full control.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all"
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
            Simple pricing. No surprises.
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
            Pay less than one hour of chasing time. Get back days of your life.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Solo */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900">Solo</h3>
              <p className="text-sm text-gray-500 mb-4">
                For independent freelancers
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  "Up to 50 invoices/month",
                  "AI follow-up sequences",
                  "Email + SMS reminders",
                  "Smart tone & escalation",
                  "Review before send",
                  "Dashboard & reports",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <span className="text-emerald-600">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro — featured */}
            <div className="bg-white rounded-xl p-8 border-2 border-emerald-500 shadow-lg shadow-emerald-100 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Pro</h3>
              <p className="text-sm text-gray-500 mb-4">
                For agencies and small teams
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  "Unlimited invoices",
                  "Everything in Solo",
                  "WhatsApp follow-ups",
                  "Payment predictions",
                  "Team access (3 users)",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <span className="text-emerald-600">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Agency */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900">Agency</h3>
              <p className="text-sm text-gray-500 mb-4">
                For multi-client businesses
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {[
                  "Everything in Pro",
                  "Unlimited locations",
                  "White-label reports",
                  "Multi-currency support",
                  "API access",
                  "Dedicated account manager",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <span className="text-emerald-600">✓</span> {f}
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
      <section id="waitlist" className="bg-emerald-900 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Early Access
          </h2>
          <p className="text-emerald-200 mb-8">
            We're launching soon. Join the waitlist and get 50% off your first 3
            months.
          </p>
          <WaitlistForm />
          <p className="text-emerald-400 text-xs mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">PR</span>
              </div>
              <span className="text-gray-400 text-sm">PayRecover</span>
            </div>
            <p className="text-gray-600 text-xs">
              &copy; 2026 PayRecover. Built for people who do the work.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}