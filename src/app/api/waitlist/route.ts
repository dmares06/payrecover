import { NextResponse } from "next/server";

// In-memory waitlist for MVP. Swap for Supabase when Antonio sets up DB.
const waitlist: string[] = [];

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    waitlist.push(email);
    console.log(`[Waitlist] New signup: ${email} (total: ${waitlist.length})`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ count: waitlist.length });
}