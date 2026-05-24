import { NorthFrame } from '../components/NorthFrame';
import { NorthScenes } from '../components/NorthScenes';

const tools = ['AI Search', 'Deep Research', 'Canvas', 'Create Image', 'Create Music'];

export default function HomePage() {
  return (
    <main className="site-shell">
      <section className="hero" data-north-id="nav">
        <div className="hero-copy">
          <p className="eyebrow">North</p>
          <h1>Learn AI by watching a guided screen.</h1>
          <p className="hero-text">
            North teaches people how to use AI tools like search, deep research,
            canvas, image, and music through focused cinematic lessons.
          </p>
        </div>

        <div className="tool-strip" aria-label="North lesson tools">
          {tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </section>

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
