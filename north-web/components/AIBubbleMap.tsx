'use client';

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

const bubbles = [
  { label: 'Search', x: '12%', y: '24%', size: 112 },
  { label: 'Deep Research', x: '58%', y: '12%', size: 136 },
  { label: 'Canvas', x: '34%', y: '48%', size: 152 },
  { label: 'Images', x: '74%', y: '44%', size: 118 },
  { label: 'Music', x: '16%', y: '68%', size: 104 },
  { label: 'Live', x: '62%', y: '72%', size: 96 },
];

export function AIBubbleMap() {
  return (
    <section style={styles.shell} aria-label="North AI capability map">
      <div style={styles.copy}>
        <p className="eyebrow">AI MAP</p>
        <h2 style={styles.title}>Gemini is not one tool. It is a whole surface.</h2>
        <p style={styles.text}>
          North breaks the surface into learnable zones, then teaches each one
          slowly with a guided screen and plain-language explanations.
        </p>
      </div>

      <div style={styles.map} aria-hidden="true">
        {bubbles.map((bubble, index) => (
          <motion.div
            key={bubble.label}
            style={{
              ...styles.bubble,
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            }}
            animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
            transition={{
              duration: 4 + index * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {bubble.label}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  shell: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.82fr) minmax(360px, 1fr)',
    gap: 28,
    alignItems: 'center',
    margin: '10px 0 30px',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 18,
    padding: 24,
    background:
      'linear-gradient(135deg, rgba(15,23,42,0.72), rgba(2,6,23,0.52))',
  },
  copy: {
    maxWidth: 520,
  },
  title: {
    margin: 0,
    fontSize: 'clamp(28px, 4vw, 48px)',
    lineHeight: 1.04,
  },
  text: {
    margin: '14px 0 0',
    color: 'rgba(226,232,240,0.76)',
    fontSize: 16,
    lineHeight: 1.65,
  },
  map: {
    position: 'relative',
    minHeight: 330,
    borderRadius: 16,
    overflow: 'hidden',
    background:
      'radial-gradient(circle at 30% 30%, rgba(103,232,249,0.16), transparent 32%), radial-gradient(circle at 70% 70%, rgba(167,139,250,0.18), transparent 34%), rgba(2,6,23,0.6)',
  },
  bubble: {
    position: 'absolute',
    display: 'grid',
    placeItems: 'center',
    transform: 'translate(-50%, -50%)',
    border: '1px solid rgba(103,232,249,0.28)',
    borderRadius: 999,
    background:
      'linear-gradient(135deg, rgba(103,232,249,0.14), rgba(167,139,250,0.18))',
    color: 'rgba(248,250,252,0.92)',
    fontSize: 14,
    fontWeight: 800,
    textAlign: 'center',
    boxShadow: '0 20px 70px rgba(0,0,0,0.28)',
  },
} satisfies Record<string, CSSProperties>;
