import { NORTH_SCENES, type NorthScene, type NorthTool } from './northScenes';

export type NorthUserLevel = 'beginner' | 'intermediate' | 'advanced';

export type NorthStepsContext = {
  sceneIds?: string[];
  userLevel: NorthUserLevel;
};

export type NorthGeneratedStep = {
  id: string;
  title: string;
  description: string;
  tool: NorthTool;
};

export type NorthChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type NorthProvider = 'openai';

function getProvider(): NorthProvider {
  // v1 supports one real provider path. Future versions can branch here for
  // Gemini or Claude while preserving the same gateway contract.
  void process.env.NORTH_AI_PROVIDER;
  return 'openai';
}

function sceneToGeneratedStep(scene: NorthScene): NorthGeneratedStep {
  return {
    id: scene.id,
    title: scene.title,
    description: scene.subtitle,
    tool: scene.tool,
  };
}

export async function generateNorthSteps(
  context: NorthStepsContext,
): Promise<NorthGeneratedStep[]> {
  const requestedSceneIds = new Set(context.sceneIds ?? NORTH_SCENES.map((scene) => scene.id));
  const scriptedSteps = NORTH_SCENES.filter((scene) => requestedSceneIds.has(scene.id)).map(
    sceneToGeneratedStep,
  );

  if (!process.env.NORTH_AI_API_KEY) {
    return scriptedSteps;
  }

  if (getProvider() === 'openai') {
    return rewriteStepsWithOpenAI(scriptedSteps, context.userLevel);
  }

  return scriptedSteps;
}

export async function northChat(messages: NorthChatMessage[]): Promise<string> {
  if (!process.env.NORTH_AI_API_KEY) {
    return 'North is not configured with an AI key yet. The scripted lessons still work, and this chat will become live once NORTH_AI_API_KEY is set.';
  }

  if (getProvider() === 'openai') {
    return chatWithOpenAI(messages);
  }

  return 'North only has the OpenAI provider wired in this v1.';
}

async function chatWithOpenAI(messages: NorthChatMessage[]): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NORTH_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.NORTH_AI_MODEL ?? 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are North, a concise AI teacher. Teach users how to use AI tools with clear, practical next steps. Do not invent unsupported UI.',
        },
        ...messages,
      ],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    return 'North could not reach the configured AI provider. Check NORTH_AI_API_KEY and NORTH_AI_MODEL.';
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return (
    data.choices?.[0]?.message?.content?.trim() ??
    'North did not receive a usable reply from the AI provider.'
  );
}

async function rewriteStepsWithOpenAI(
  steps: NorthGeneratedStep[],
  userLevel: NorthUserLevel,
): Promise<NorthGeneratedStep[]> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NORTH_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.NORTH_AI_MODEL ?? 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Rewrite North lesson descriptions. Return strict JSON with a steps array. Preserve every id, title, and tool. Keep descriptions short and beginner-safe.',
        },
        {
          role: 'user',
          content: JSON.stringify({ userLevel, steps }),
        },
      ],
      temperature: 0.35,
    }),
  });

  if (!response.ok) {
    return steps;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  try {
    const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? '{}') as {
      steps?: NorthGeneratedStep[];
    };

    return Array.isArray(parsed.steps) ? parsed.steps : steps;
  } catch {
    return steps;
  }
}
