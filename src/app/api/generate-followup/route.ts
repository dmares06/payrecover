import { NextResponse } from "next/server";
import {
  generateFollowUp,
  getToneForOverdueDays,
  type FollowUpConfig,
} from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientCompany,
      invoiceNumber = "1042",
      invoiceAmount,
      invoiceDate = "",
      dueDate = "",
      daysOverdue,
      tone,
      channel,
      ownerName = "Sarah",
    } = body;

    if (!clientName || invoiceAmount === undefined || daysOverdue === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const config: FollowUpConfig = {
      clientName,
      clientCompany,
      invoiceNumber,
      invoiceAmount: parseFloat(invoiceAmount),
      invoiceDate,
      dueDate,
      daysOverdue: parseInt(daysOverdue),
      tone: (tone as FollowUpConfig["tone"]) || getToneForOverdueDays(parseInt(daysOverdue)),
      channel: (channel as "email" | "sms") || "email",
      ownerName,
    };

    const message = await generateFollowUp(config);
    return NextResponse.json({ message });
  } catch (error) {
    console.error("generate-followup error:", error);
    return NextResponse.json(
      { error: "Failed to generate follow-up" },
      { status: 500 }
    );
  }
}