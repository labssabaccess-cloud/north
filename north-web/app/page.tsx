import Link from 'next/link';
import { AIBubbleMap } from '../components/AIBubbleMap';
import { NorthFrame } from '../components/NorthFrame';
import { NorthScenes } from '../components/NorthScenes';

const tools = [
  'AI Search',
  'Models',
  'Deep Research',
  'Canvas',
  'Images',
  'Music',
  'Live',
];

export default function HomePage() {
  return (
    <main className="site-shell">
      <section className="hero" data-north-id="nav">
        <div className="hero-copy">
          <p className="eyebrow">North</p>
          <h1>Learn AI by watching a guided screen.</h1>
          <p className="hero-text">
            North teaches people how to use Gemini-style AI tools through
            focused cinematic lessons, readable explanations, and guided
            practice.
          </p>
          <div className="scene-controls">
            <Link className="north-button primary" href="/learn/gemini">
              Start Gemini lesson
            </Link>
          </div>
        </div>

        <div className="tool-strip" aria-label="North lesson tools">
          {tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </section>

      <AIBubbleMap />

      <div data-north-id="primary-cta">
        <NorthFrame>
          <NorthScenes />
        </NorthFrame>
      </div>

      <footer className="site-footer">
        Built with Next.js · Framer Motion · OpenAI-ready gateway
      </footer>
    </main>
  );
}
