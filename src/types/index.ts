export interface User {
  id: string;
  email: string;
  name?: string;
  stripeAccountId?: string;
  plan?: "solo" | "pro" | "agency";
  createdAt: string;
}

export interface Invoice {
  id: string;
  userId: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  invoiceNumber: string;
  amount: number;
  issuedAt: string;
  dueAt: string;
  status: "pending" | "paid" | "overdue";
  daysOverdue: number;
  followUpHistory: FollowUpEntry[];
  nextFollowUpAt?: string;
}

export interface FollowUpEntry {
  id: string;
  invoiceId: string;
  sentAt: string;
  channel: "email" | "sms";
  tone: "friendly" | "firm" | "urgent";
  subject?: string;
  body: string;
  opened?: boolean;
  responded?: boolean;
}

export interface WaitlistEntry {
  email: string;
  createdAt: string;
}