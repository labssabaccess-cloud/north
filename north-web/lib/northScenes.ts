export type NorthTool =
  | 'search'
  | 'deepResearch'
  | 'canvas'
  | 'image'
  | 'music';

export type NorthSceneStep = {
  id: string;
  caption: string;
  delayMs?: number;
  durationMs?: number;
};

export type NorthScene = {
  id: string;
  tool: NorthTool;
  title: string;
  subtitle: string;
  narration: string;
  steps: NorthSceneStep[];
  estimatedDurationMs: number;
};

export const NORTH_SCENES: NorthScene[] = [
  {
    id: 'search',
    tool: 'search',
    title: 'Search with AI',
    subtitle: 'Ask full questions instead of guessing keywords.',
    narration:
      'North starts with search because it is the fastest way to feel how AI changes everyday learning.',
    estimatedDurationMs: 9000,
    steps: [
      {
        id: 'search-question',
        caption: 'Type the question the way you would ask a patient teacher.',
        durationMs: 2400,
      },
      {
        id: 'search-follow-up',
        caption: 'Use follow-ups to narrow the answer instead of starting over.',
        durationMs: 2600,
      },
      {
        id: 'search-sources',
        caption: 'Check the sources when accuracy matters.',
        durationMs: 2500,
      },
    ],
  },
  {
    id: 'deep-research',
    tool: 'deepResearch',
    title: 'Deep Research',
    subtitle: 'Let the model read for you, then inspect the trail.',
    narration:
      'Deep research is for slow questions: comparisons, unfamiliar topics, and decisions with tradeoffs.',
    estimatedDurationMs: 10000,
    steps: [
      {
        id: 'research-brief',
        caption: 'Start with a clear brief: what you need, why, and by when.',
        durationMs: 2600,
      },
      {
        id: 'research-scan',
        caption: 'North shows the model gathering sources before it summarizes.',
        durationMs: 2600,
      },
      {
        id: 'research-report',
        caption: 'Read the report like a map, not a final verdict.',
        durationMs: 2800,
      },
    ],
  },
  {
    id: 'canvas',
    tool: 'canvas',
    title: 'Canvas',
    subtitle:
      'Your action space for docs, apps, infographics, quizzes, and audio overviews.',
    narration:
      'Canvas turns an answer into a workspace. You can shape, revise, and build instead of only reading.',
    estimatedDurationMs: 10000,
    steps: [
      {
        id: 'canvas-create',
        caption: 'Send a useful answer into canvas when it deserves a home.',
        durationMs: 2500,
      },
      {
        id: 'canvas-edit',
        caption: 'Ask for changes in plain language and watch the draft update.',
        durationMs: 2800,
      },
      {
        id: 'canvas-export',
        caption: 'Turn the workspace into a lesson, quiz, artifact, or shareable output.',
        durationMs: 2800,
      },
    ],
  },
  {
    id: 'image',
    tool: 'image',
    title: 'Create Image',
    subtitle: 'Describe the visual, then refine with taste.',
    narration:
      'Image generation works best when you name the subject, style, setting, and constraints.',
    estimatedDurationMs: 9000,
    steps: [
      {
        id: 'image-prompt',
        caption: 'Start with the real subject and the job the image needs to do.',
        durationMs: 2400,
      },
      {
        id: 'image-variants',
        caption: 'Compare variants by composition, clarity, and usefulness.',
        durationMs: 2600,
      },
      {
        id: 'image-refine',
        caption: 'Refine the strongest version instead of chasing random luck.',
        durationMs: 2600,
      },
    ],
  },
  {
    id: 'music',
    tool: 'music',
    title: 'Create Music',
    subtitle: 'Use mood, structure, and references to guide sound.',
    narration:
      'Music tools respond to emotional direction and structure. North teaches the knobs before the magic.',
    estimatedDurationMs: 9000,
    steps: [
      {
        id: 'music-mood',
        caption: 'Name the mood, pace, and moment the track should support.',
        durationMs: 2400,
      },
      {
        id: 'music-structure',
        caption: 'Ask for sections: intro, rise, drop, loop, or soft ending.',
        durationMs: 2500,
      },
      {
        id: 'music-iterate',
        caption: 'Iterate with concrete notes: less busy, warmer, brighter, shorter.',
        durationMs: 2600,
      },
    ],
  },
];
