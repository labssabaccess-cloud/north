import { NextResponse } from 'next/server';
import {
  generateNorthSteps,
  type NorthStepsContext,
  type NorthUserLevel,
} from '../../../../lib/northAiClient';

function isUserLevel(value: unknown): value is NorthUserLevel {
  return value === 'beginner' || value === 'intermediate' || value === 'advanced';
}

function parseContext(value: unknown): NorthStepsContext | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<NorthStepsContext>;

  if (!isUserLevel(candidate.userLevel)) {
    return null;
  }

  return {
    sceneIds: Array.isArray(candidate.sceneIds)
      ? candidate.sceneIds.filter((id): id is string => typeof id === 'string')
      : undefined,
    userLevel: candidate.userLevel,
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { context?: unknown } | null;
  const context = parseContext(body?.context);

  if (!context) {
    return NextResponse.json(
      { error: 'Invalid context. Expected sceneIds and userLevel.' },
      { status: 400 },
    );
  }

  const steps = await generateNorthSteps(context);
  return NextResponse.json({ steps });
}
