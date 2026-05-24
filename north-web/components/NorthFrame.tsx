'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type NorthFrameProps = {
  children: ReactNode;
};

export function NorthFrame({ children }: NorthFrameProps) {
  return (
    <motion.section
      className="north-frame-wrap"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="North guided AI lesson"
    >
      <div className="north-frame-glow" aria-hidden="true" />
      <div className="north-frame">
        <div className="window-chrome">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="window-title">North Playground</div>
          <div className="mock-pill">Guided</div>
        </div>
        <div className="north-frame-body">{children}</div>
      </div>
    </motion.section>
  );
}
