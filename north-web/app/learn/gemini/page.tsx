import Link from 'next/link';
import { NorthFrame } from '../../../components/NorthFrame';
import { NorthScenes } from '../../../components/NorthScenes';

export default function GeminiLessonPage() {
  return (
    <main className="site-shell">
      <section className="hero" data-north-id="nav">
        <div className="hero-copy">
          <p className="eyebrow">GEMINI LESSON</p>
          <h1>Learn Gemini one feature at a time.</h1>
          <p className="hero-text">
            Watch North explain Search, model choice, the plus menu, Deep
            Research, Canvas, image generation, music, multimodal input, Gems,
            Live, Workspace, Extensions, and Memory.
          </p>
          <div className="scene-controls">
            <Link className="north-button" href="/">
              Back to North
            </Link>
          </div>
        </div>
      </section>

      <div data-north-id="primary-cta">
        <NorthFrame>
          <NorthScenes />
        </NorthFrame>
      </div>
    </main>
  );
}
