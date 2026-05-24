import { NextResponse } from 'next/server';
import { northChat, type NorthChatMessage } from '../../../../lib/northAiClient';

function isNorthChatMessage(value: unknown): value is NorthChatMessage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<NorthChatMessage>;
  return (
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.content === 'string'
  );
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { messages?: unknown } | null;

  if (!Array.isArray(body?.messages) || !body.messages.every(isNorthChatMessage)) {
    return NextResponse.json(
      { error: 'Invalid messages.' },
      { status: 400 },
    );
  }

  const reply = await northChat(body.messages.slice(-12));
  return NextResponse.json({ reply });
}
