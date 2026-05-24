'use client';

import { useState } from 'react';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
};

const initialMessages: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      'Ask me what you want to learn next: better AI search prompts, deep research briefs, canvas workflows, image prompts, or music direction.',
  },
];

export function NorthChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function sendMessage() {
    const trimmed = draft.trim();
    if (!trimmed || isSending) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    };

    setMessages((items) => [...items, userMessage]);
    setDraft('');
    setIsSending(true);

    try {
      const nextMessages = [...messages, userMessage].map(({ role, content }) => ({
        role,
        content,
      }));

      const response = await fetch('/api/north/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { reply?: string };
      setMessages((items) => [
        ...items,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            data.reply ??
            'North is in stub mode, but this is where the AI response will appear.',
        },
      ]);
    } catch {
      setMessages((items) => [
        ...items,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'I could not reach the North AI Gateway. The scripted lessons still work without AI.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="chat-panel" aria-label="North follow-up chat">
      <div className="chat-header">
        <p className="scene-label">NORTH CHAT</p>
        <h2>Your AI learning coach</h2>
        <p>Stubbed today, provider-ready tomorrow.</p>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>

      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage();
        }}
      >
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask North how to learn an AI workflow..."
          aria-label="Message North"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              void sendMessage();
            }
          }}
        />
        <button className="north-button primary" type="submit" disabled={isSending}>
          {isSending ? 'Sending' : 'Send'}
        </button>
      </form>
    </section>
  );
}
