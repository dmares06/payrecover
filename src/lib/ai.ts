// AI Invoice Follow-Up Engine
// Generates personalized payment reminders in the business owner's voice.
// Uses OpenRouter for LLM access (free tier available).

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

export interface FollowUpConfig {
  clientName: string;
  clientCompany?: string;
  invoiceNumber: string;
  invoiceAmount: number;
  invoiceDate: string;
  dueDate: string;
  daysOverdue: number;
  tone: "friendly" | "firm" | "urgent";
  channel: "email" | "sms";
  ownerName: string;
  ownerVoiceSample?: string; // optional past email text to mimic style
}

export interface FollowUpMessage {
  subject?: string;
  body: string;
  channel: "email" | "sms";
}

const TONE_GUIDE = {
  friendly:
    "Warm, casual, assumes they simply forgot. Short, no pressure. Use the owner's natural voice.",
  firm:
    "Professional but direct. Still polite — not aggressive. Remind them of the agreement. Ask for a specific date.",
  urgent:
    "Clear that this is now a priority. Escalate consequences gently — service pause, late fees. Still professional.",
};

export function generateFollowUpPrompt(config: FollowUpConfig): string {
  const toneLabel = TONE_GUIDE[config.tone];
  const channel =
    config.channel === "sms"
      ? "a short text message (under 160 chars if possible)"
      : "an email";

  let voiceGuidance = "";
  if (config.ownerVoiceSample) {
    voiceGuidance = `\n\nIMITATE THIS WRITING STYLE:\n---\n${config.ownerVoiceSample}\n---`;
  }

  return `You are ${config.ownerName}'s payment follow-up assistant. Write ${channel} to ${config.clientName}${
    config.clientCompany ? ` at ${config.clientCompany}` : ""
  } about invoice ${config.invoiceNumber} for $${config.invoiceAmount.toFixed(
    2
  )} (dated ${config.invoiceDate}, due ${config.dueDate}).

Tone: ${toneLabel}
The invoice is ${config.daysOverdue} days overdue.${voiceGuidance}

${
  config.channel === "email"
    ? "Write a subject line and body. Sign it from the owner. Keep it to 3-4 short paragraphs max."
    : "Write a concise text. Keep it under 160 characters. No formal sign-off needed — just their name."
}

IMPORTANT: Do NOT use em dashes (—). Use periods or commas instead. Write naturally — like a real person sending a real message.`;
}

export async function generateFollowUp(
  config: FollowUpConfig
): Promise<FollowUpMessage> {
  if (!OPENROUTER_API_KEY) {
    // Fallback template when no AI API key is configured
    return generateFallbackMessage(config);
  }

  const prompt = generateFollowUpPrompt(config);

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://payrecover.vercel.app",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You write short, natural payment follow-ups for freelancers and small business owners. You match their voice. You never sound robotic. No em dashes.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: config.channel === "sms" ? 100 : 400,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim() || "";

    if (config.channel === "email") {
      const lines = content.split("\n").filter(Boolean);
      const subject =
        lines.find((l: string) => l.startsWith("Subject:"))?.replace("Subject:", "").trim() ||
        `Quick follow-up on invoice ${config.invoiceNumber}`;
      const body = content
        .replace(/^Subject:.*\n?/i, "")
        .trim()
        .replace(/\u2014/g, "."); // strip em dashes
      return { subject, body, channel: "email" };
    }

    return { body: content.replace(/\u2014/g, "."), channel: "sms" };
  } catch (error) {
    console.error("AI generation failed, using fallback:", error);
    return generateFallbackMessage(config);
  }
}

function generateFallbackMessage(config: FollowUpConfig): FollowUpMessage {
  const friendlyMessages = [
    `Hey ${config.clientName}, just a quick nudge on invoice ${config.invoiceNumber} for $${config.invoiceAmount.toFixed(2)} — wanted to make sure it landed okay. Let me know if anything's needed! — ${config.ownerName}`,
  ];

  const firmMessages = [
    `Hi ${config.clientName}, following up on invoice ${config.invoiceNumber} ($${config.invoiceAmount.toFixed(2)}) which is now ${config.daysOverdue} days overdue. Could you let me know when to expect payment? Thanks, ${config.ownerName}`,
  ];

  const urgentMessages = [
    `${config.clientName}, invoice ${config.invoiceNumber} for $${config.invoiceAmount.toFixed(2)} is now ${config.daysOverdue} days overdue. Please remit payment by end of week to avoid late fees. Thanks, ${config.ownerName}`,
  ];

  const messagesByTone = {
    friendly: friendlyMessages,
    firm: firmMessages,
    urgent: urgentMessages,
  };

  const messages = messagesByTone[config.tone];

  if (config.channel === "sms") {
    const msg = messages[0];
    return {
      body: msg.length > 160 ? msg.slice(0, 157) + "..." : msg,
      channel: "sms",
    };
  }

  return {
    subject: `Quick follow-up on invoice ${config.invoiceNumber}`,
    body: messages[0],
    channel: "email",
  };
}

// Escalation schedule: returns the right tone based on days overdue
export function getToneForOverdueDays(days: number): FollowUpConfig["tone"] {
  if (days <= 7) return "friendly";
  if (days <= 21) return "firm";
  return "urgent";
}

// Determine next follow-up action based on overdue timeline
export function getNextFollowUpDate(
  daysOverdue: number
): { daysFromNow: number; tone: FollowUpConfig["tone"] } {
  if (daysOverdue <= 7) return { daysFromNow: 7, tone: "firm" };
  if (daysOverdue <= 21) return { daysFromNow: 7, tone: "urgent" };
  return { daysFromNow: 14, tone: "urgent" }; // final escalation
}