import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayRecover — AI Invoice Chasing for Freelancers",
  description:
    "Stop chasing late payments. PayRecover automatically follows up on overdue invoices with AI-written reminders that sound like you. Get paid 2x faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}