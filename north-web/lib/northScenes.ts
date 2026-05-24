export type NorthTool =
  | 'search'
  | 'modelSelector'
  | 'plusMenu'
  | 'deepResearch'
  | 'canvas'
  | 'image'
  | 'music'
  | 'multimodal'
  | 'gems'
  | 'live'
  | 'workspace'
  | 'extensions'
  | 'memory';

export type NorthSceneStep = {
  id: string;
  caption: string;
  explanation: string;
  targetNorthId?: string;
  autoAdvanceMs?: number;
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
    subtitle: 'Ask full questions, not just keywords.',
    narration:
      "Gemini understands natural language. Instead of typing 'best laptop 2024', you can ask 'What is the best laptop for a student who edits video on a budget?' and get a real answer.",
    steps: [
      {
        id: 'search-1',
        caption: 'Type like you speak',
        explanation:
          "Gemini understands full sentences and context. You don't need to guess the right keywords - just describe what you're looking for as if you're asking a knowledgeable friend. The more detail you give, the better the answer.",
        targetNorthId: 'search-bar',
        autoAdvanceMs: 14000,
      },
      {
        id: 'search-2',
        caption: 'Use follow-ups to go deeper',
        explanation:
          "After Gemini answers, you can ask follow-up questions in the same conversation. It remembers everything you said. Try 'Can you explain that in simpler terms?' or 'Give me a specific example of that.'",
        autoAdvanceMs: 14000,
      },
      {
        id: 'search-3',
        caption: 'Ask for comparisons',
        explanation:
          "Gemini is great at comparing options side by side. Ask things like 'Compare React and Vue for a beginner' or 'What are the pros and cons of living in Bangalore vs Mumbai?' It will give you a structured, balanced answer.",
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 45000,
  },
  {
    id: 'model-selector',
    tool: 'modelSelector',
    title: 'Choosing the right model',
    subtitle: 'Flash, Pro, or Ultra - when to use which.',
    narration:
      'Gemini comes in several versions. Choosing the right one saves time and gives better results.',
    steps: [
      {
        id: 'model-1',
        caption: 'What is Flash?',
        explanation:
          'Gemini Flash is the fastest and most efficient model. Use it for everyday tasks: answering questions, summarizing text, writing emails, and quick lookups. It responds almost instantly and is free to use.',
        targetNorthId: 'model-selector',
        autoAdvanceMs: 14000,
      },
      {
        id: 'model-2',
        caption: 'When to upgrade to Pro',
        explanation:
          "Gemini Pro is more powerful and better at reasoning, coding, and complex analysis. Use it when Flash gives shallow answers, when you need multi-step logic, or when you're working on something important. It's included in Google One AI Premium.",
        targetNorthId: 'model-selector',
        autoAdvanceMs: 14000,
      },
      {
        id: 'model-3',
        caption: 'Ultra: the top tier',
        explanation:
          'Gemini Ultra is the most capable model, designed for highly complex tasks like advanced research, detailed code generation, and nuanced analysis. Think of it as hiring a specialist instead of a generalist.',
        targetNorthId: 'model-selector',
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 45000,
  },
  {
    id: 'plus-menu',
    tool: 'plusMenu',
    title: 'The + Menu',
    subtitle: "Your gateway to Gemini's most powerful tools.",
    narration:
      'The small + icon next to the search bar unlocks a suite of features beyond regular chat.',
    steps: [
      {
        id: 'plus-1',
        caption: 'Where everything starts',
        explanation:
          "The + icon in the bottom-left of the search bar is the entry point to most of Gemini's advanced tools. Click it any time you want to do something beyond plain text conversation - like creating images, starting deep research, or opening Canvas.",
        targetNorthId: 'plus-button',
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 15000,
  },
  {
    id: 'deepResearch',
    tool: 'deepResearch',
    title: 'Deep Research',
    subtitle: "Let Gemini read dozens of sources so you don't have to.",
    narration:
      'Deep Research is like giving a research task to a brilliant assistant who comes back in minutes with a full report.',
    steps: [
      {
        id: 'dr-1',
        caption: 'What is Deep Research?',
        explanation:
          "Deep Research is a special Gemini mode where it autonomously browses the web, reads multiple sources, synthesizes information, and produces a long-form, cited report. It's not just answering a question - it's doing a full research session on your behalf.",
        targetNorthId: 'deep-research-item',
        autoAdvanceMs: 14000,
      },
      {
        id: 'dr-2',
        caption: 'When to use it',
        explanation:
          "Use Deep Research when your question requires reading more than a few sources. Examples: 'Give me a comprehensive overview of the electric vehicle market in India in 2024' or 'What are the latest findings on intermittent fasting and cognitive performance?' It's ideal for academic, business, and personal research tasks.",
        autoAdvanceMs: 14000,
      },
      {
        id: 'dr-3',
        caption: 'How to read the report',
        explanation:
          'Deep Research returns a structured document with sections, citations, and summaries. You can read it in Gemini, export it to Google Docs, or ask Gemini to summarize specific sections further. The sources are linked so you can verify anything yourself.',
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 45000,
  },
  {
    id: 'canvas',
    tool: 'canvas',
    title: 'Canvas',
    subtitle: 'Your collaborative workspace for docs, apps, and more.',
    narration:
      'Canvas turns Gemini from a chat window into an interactive creation studio.',
    steps: [
      {
        id: 'canvas-1',
        caption: 'What is Canvas?',
        explanation:
          'Canvas is a split-screen workspace inside Gemini where you can collaborate on documents, write and run code, build web apps, create infographics, make quizzes, and generate audio overviews. You chat on the left and see your creation on the right.',
        targetNorthId: 'canvas-item',
        autoAdvanceMs: 14000,
      },
      {
        id: 'canvas-2',
        caption: 'Writing in Canvas',
        explanation:
          'Ask Gemini to write an essay, a report, a cover letter, or any long-form document. It appears in Canvas where you can edit it directly, ask Gemini to revise specific paragraphs, change the tone, or add sections - all in real time.',
        autoAdvanceMs: 14000,
      },
      {
        id: 'canvas-3',
        caption: 'Coding in Canvas',
        explanation:
          "Canvas has a built-in code editor and live preview. Ask Gemini to write a web page, a Python script, or a data visualization. You'll see the code on the left and the running result on the right. You can ask for changes and watch them update instantly.",
        autoAdvanceMs: 14000,
      },
      {
        id: 'canvas-4',
        caption: 'Audio overviews',
        explanation:
          'Canvas can turn any document or research into a podcast-style audio overview. Two AI voices discuss your content conversationally. This is great for learning while commuting or for quickly absorbing long documents without reading every word.',
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 60000,
  },
  {
    id: 'image',
    tool: 'image',
    title: 'Create Image',
    subtitle: 'Generate any image from a text description.',
    narration:
      'Gemini can create photorealistic images, illustrations, logos, and concept art from a simple text prompt.',
    steps: [
      {
        id: 'img-1',
        caption: 'How to write a good image prompt',
        explanation:
          "Be specific about what you want. Instead of 'a dog', try 'a golden retriever puppy sitting in a sunlit garden, photorealistic, soft focus background.' Include style, mood, lighting, and composition details. The more vivid your description, the closer the result is to your vision.",
        targetNorthId: 'create-image-item',
        autoAdvanceMs: 14000,
      },
      {
        id: 'img-2',
        caption: 'Iterating on images',
        explanation:
          "If the first result isn't quite right, don't start over. Ask Gemini to adjust: 'Make the background more golden', 'Add a city skyline in the distance', 'Make it look more like a watercolor painting.' You can refine the image through conversation.",
        autoAdvanceMs: 14000,
      },
      {
        id: 'img-3',
        caption: 'Use cases for image generation',
        explanation:
          'Created images can be used for presentations, social media, blog posts, mood boards, or creative projects. You can also use it to visualize ideas before commissioning real artwork, or to quickly prototype visual concepts for a product or brand.',
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 45000,
  },
  {
    id: 'music',
    tool: 'music',
    title: 'Create Music',
    subtitle: 'Generate original music from a text description.',
    narration:
      'Gemini can compose original music in any genre, mood, or style from a simple prompt.',
    steps: [
      {
        id: 'music-1',
        caption: 'What Create Music can do',
        explanation:
          "Create Music generates original audio tracks from your description. You can specify genre (jazz, lo-fi, cinematic), mood (calm, energetic, melancholic), instruments (piano, guitar, strings), and tempo. It's great for background music, creative projects, or just exploring.",
        targetNorthId: 'create-music-item',
        autoAdvanceMs: 14000,
      },
      {
        id: 'music-2',
        caption: 'Writing a music prompt',
        explanation:
          "A good music prompt sounds like: 'A slow, melancholic piano piece with soft strings in the background, suitable for a rainy evening study session.' You can also reference genres or moods: 'Lo-fi hip hop with subtle vinyl crackle' or 'Upbeat acoustic guitar, summer vibes, happy.'",
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 30000,
  },
  {
    id: 'multimodal',
    tool: 'multimodal',
    title: 'Multimodal Input',
    subtitle: 'Upload images, PDFs, and audio - then ask questions about them.',
    narration:
      "Gemini isn't limited to text. You can show it things and have a real conversation about what it sees.",
    steps: [
      {
        id: 'mm-1',
        caption: 'Upload a file or image',
        explanation:
          "Click the + menu and choose 'Upload files' or 'Add from Drive'. You can upload images, PDFs, spreadsheets, and more. Once uploaded, Gemini can read, analyze, summarize, and answer questions about the content just as fluently as it handles plain text.",
        targetNorthId: 'plus-button',
        autoAdvanceMs: 14000,
      },
      {
        id: 'mm-2',
        caption: 'What to do with an uploaded image',
        explanation:
          "You can ask Gemini to describe what's in an image, extract text from a photo, analyze a chart or diagram, identify objects or landmarks, or explain a screenshot of an error message. It sees and understands images at a very high level.",
        targetNorthId: 'upload-files-item',
        autoAdvanceMs: 14000,
      },
      {
        id: 'mm-3',
        caption: 'Working with PDFs and documents',
        explanation:
          'Upload a long PDF - a research paper, a contract, a textbook chapter - and ask Gemini to summarize it, find specific information, compare sections, or explain difficult passages. It reads the whole document, not just the first page.',
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 45000,
  },
  {
    id: 'gems',
    tool: 'gems',
    title: 'Gems',
    subtitle: 'Build your own custom AI persona for any task.',
    narration:
      'Gems are personal AI assistants you create and configure once, then use whenever you need them.',
    steps: [
      {
        id: 'gems-1',
        caption: 'What is a Gem?',
        explanation:
          'A Gem is a customized version of Gemini with specific instructions, a persona, and a focus area. You can create a Gem that always responds like a patient coding tutor, a strict grammar editor, a startup advisor, or a fitness coach - whatever you need most.',
        autoAdvanceMs: 14000,
      },
      {
        id: 'gems-2',
        caption: 'Creating your first Gem',
        explanation:
          "Go to the Gems section in Gemini's sidebar. Click 'New Gem', give it a name, and write instructions for how it should behave. For example: 'You are a concise, no-fluff writing editor. When I share writing, point out what's unclear, wordy, or weak. Be direct.'",
        autoAdvanceMs: 14000,
      },
      {
        id: 'gems-3',
        caption: 'Using Gems effectively',
        explanation:
          "Once created, your Gem remembers its personality every time you open it. You don't need to re-explain your preferences. Over time, having well-crafted Gems for your most common tasks dramatically speeds up how you work with Gemini.",
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 45000,
  },
  {
    id: 'live',
    tool: 'live',
    title: 'Gemini Live',
    subtitle: 'Have a real-time voice conversation with Gemini.',
    narration:
      'Gemini Live lets you speak naturally and hear Gemini respond, like a phone call with an AI that knows everything.',
    steps: [
      {
        id: 'live-1',
        caption: 'What is Gemini Live?',
        explanation:
          "Gemini Live is a real-time voice mode where you speak out loud and Gemini responds with natural speech. It's not a voice-to-text shortcut - it's a full conversational experience. You can interrupt it, go back and forth, and have multi-turn discussions just like a phone call.",
        targetNorthId: 'mic-button',
        autoAdvanceMs: 14000,
      },
      {
        id: 'live-2',
        caption: 'Best use cases for Live',
        explanation:
          "Gemini Live is ideal when your hands are busy (cooking, commuting, exercising), when you think better by speaking, when you want to rehearse a presentation or conversation, or when reading and typing feel like too much friction. It's also great for language practice.",
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 30000,
  },
  {
    id: 'workspace',
    tool: 'workspace',
    title: 'Google Workspace Integration',
    subtitle: 'Gemini inside Docs, Sheets, Gmail, and Drive.',
    narration:
      "Gemini doesn't just live at gemini.google.com - it's also built directly into your Google Workspace tools.",
    steps: [
      {
        id: 'ws-1',
        caption: 'Gemini in Gmail',
        explanation:
          'In Gmail, Gemini can summarize long email threads in one click, suggest replies, help you draft professional emails from bullet points, and even help you search your inbox by meaning rather than keywords. Look for the Gemini icon in the toolbar.',
        autoAdvanceMs: 14000,
      },
      {
        id: 'ws-2',
        caption: 'Gemini in Google Docs',
        explanation:
          'In Google Docs, you can ask Gemini to write a first draft, rewrite a selected section in a different tone, summarize the document, add bullet points, or translate content. It works as a real-time co-writer directly in your document.',
        autoAdvanceMs: 14000,
      },
      {
        id: 'ws-3',
        caption: 'Gemini in Sheets',
        explanation:
          'In Google Sheets, Gemini can help you write formulas, analyze data trends, generate charts, clean up messy data, and even explain what a complex formula does. You describe what you want in plain English and it handles the technical parts.',
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 45000,
  },
  {
    id: 'extensions',
    tool: 'extensions',
    title: 'Extensions',
    subtitle: 'Connect Gemini to Maps, YouTube, Flights, and more.',
    narration:
      "Extensions let Gemini pull live data from Google's services and give you answers grounded in real-world information.",
    steps: [
      {
        id: 'ext-1',
        caption: 'What are Extensions?',
        explanation:
          'Extensions connect Gemini to external Google services so it can access live, personalized data. With Extensions enabled, Gemini can check your Google Calendar, search your Gmail, look up real-time flight prices, find places on Google Maps, and search YouTube - all from the same chat window.',
        autoAdvanceMs: 14000,
      },
      {
        id: 'ext-2',
        caption: 'How to enable Extensions',
        explanation:
          "Click the Extensions option in Gemini's settings or side menu. You'll see a list of available integrations. Toggle on the ones you want. Once enabled, Gemini will automatically use them when your question requires live data - you don't have to do anything extra.",
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 30000,
  },
  {
    id: 'memory',
    tool: 'memory',
    title: 'Context and Memory',
    subtitle: "How Gemini remembers what you've said.",
    narration:
      "Understanding how Gemini's memory works helps you use it far more effectively across long sessions.",
    steps: [
      {
        id: 'mem-1',
        caption: 'Within a conversation',
        explanation:
          "Within a single conversation, Gemini remembers everything you've said. You can refer back to earlier points, build on previous answers, and change direction mid-conversation. Think of it as a shared working memory between you and the model for that session.",
        autoAdvanceMs: 14000,
      },
      {
        id: 'mem-2',
        caption: 'Across conversations',
        explanation:
          'By default, Gemini does not remember previous conversations. Each new chat starts fresh. However, you can use the Memory feature (where available) to give Gemini persistent facts about yourself - your name, preferences, goals, and context - so it does not need to relearn them every time.',
        autoAdvanceMs: 14000,
      },
      {
        id: 'mem-3',
        caption: 'Using context windows wisely',
        explanation:
          "For long research or writing sessions, keep everything in one conversation rather than starting new ones. This lets Gemini use everything you've discussed as context for each new response. If a conversation gets very long and quality drops, start a new one with a brief recap.",
        autoAdvanceMs: 14000,
      },
    ],
    estimatedDurationMs: 45000,
  },
];
