// Stripe helpers — Antonio creates the account, pastes keys into .env.local
// This module reads the keys and exports configured Stripe instances.

import Stripe from "stripe";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-08-26.dahlia" });
}

export const stripe = getStripe();

export function getStripePublishableKey(): string {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
}

// Price IDs — set these in Stripe Dashboard after creating products
export const PRICE_IDS = {
  solo: process.env.STRIPE_PRICE_SOLO || "",
  pro: process.env.STRIPE_PRICE_PRO || "",
  agency: process.env.STRIPE_PRICE_AGENCY || "",
};