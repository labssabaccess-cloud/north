'use client';

import { motion } from 'framer-motion';
import type { NorthScene } from '../lib/northScenes';

type NorthCheckInProps = {
  scene: NorthScene;
  onContinue: () => void;
  onReplay: () => void;
  onSkip: () => void;
};

export function NorthCheckIn({
  scene,
  onContinue,
  onReplay,
  onSkip,
}: NorthCheckInProps) {
  return (
    <motion.div
      className="check-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="check-in-card"
        initial={{ scale: 0.97, y: 8 }}
        animate={{ scale: 1, y: 0 }}
      >
        <h3>Did the {scene.title} part make sense?</h3>
        <p>
          Continue when the idea feels clear, replay if you want to watch it
          again, or move into the North handoff.
        </p>
        <div className="scene-controls">
          <button className="north-button primary" type="button" onClick={onContinue}>
            Continue
          </button>
          <button className="north-button" type="button" onClick={onReplay}>
            Replay
          </button>
          <button className="north-button" type="button" onClick={onSkip}>
            Skip to chat
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
