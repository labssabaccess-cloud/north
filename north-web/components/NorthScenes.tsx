'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NORTH_SCENES } from '../lib/northScenes';
import { NorthCheckIn } from './NorthCheckIn';
import { NorthChat } from './NorthChat';

type SceneMode = 'intro' | 'scene' | 'checkIn' | 'handoff' | 'chat';

const INTRO_DURATION_MS = 800;
const HANDOFF_DURATION_MS = 1500;

export function NorthScenes() {
  const [mode, setMode] = useState<SceneMode>('intro');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const scene = NORTH_SCENES[sceneIndex];
  const currentStep = scene?.steps[stepIndex];
  const visibleSteps = scene?.steps.slice(0, stepIndex + 1) ?? [];
  const progressItems = useMemo(() => NORTH_SCENES.map((item) => item.id), []);

  const startScene = useCallback(() => {
    setMode('scene');
    setStepIndex(0);
  }, []);

  const replayScene = useCallback(() => {
    setStepIndex(0);
    setMode('scene');
  }, []);

  const continueToNext = useCallback(() => {
    if (sceneIndex >= NORTH_SCENES.length - 1) {
      setMode('handoff');
      return;
    }

    setSceneIndex((index) => index + 1);
    setStepIndex(0);
    setMode('scene');
  }, [sceneIndex]);

  useEffect(() => {
    if (mode !== 'intro') {
      return;
    }

    const timer = window.setTimeout(startScene, INTRO_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [mode, startScene]);

  useEffect(() => {
    if (mode !== 'handoff') {
      return;
    }

    const timer = window.setTimeout(() => setMode('chat'), HANDOFF_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [mode]);

  useEffect(() => {
    if (mode !== 'scene' || !scene || !currentStep) {
      return;
    }

    const duration = (currentStep.delayMs ?? 0) + (currentStep.durationMs ?? 2400);
    const timer = window.setTimeout(() => {
      if (stepIndex >= scene.steps.length - 1) {
        setMode('checkIn');
      } else {
        setStepIndex((index) => index + 1);
      }
    }, duration);

    return () => window.clearTimeout(timer);
  }, [currentStep, mode, scene, stepIndex]);

  if (mode === 'chat') {
    return (
      <div className="scene-stage">
        <NorthChat />
      </div>
    );
  }

  if (mode === 'handoff') {
    return (
      <div className="scene-stage">
        <motion.div
          className="handoff-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="scene-label">YOUR TURN</p>
            <h2>Ask North what you want to learn next.</h2>
            <p>
              The scripted path gave you the map. The chat is where North can
              become a teacher for your exact goal.
            </p>
            <p className="scene-narration">Opening chat...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="scene-stage">
      <div className="scene-grid">
        <motion.aside
          key={scene.id}
          className="scene-panel"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42 }}
        >
          <div>
            <p className="scene-label">
              LESSON {sceneIndex + 1} / {NORTH_SCENES.length}
            </p>
            <h2>{scene.title}</h2>
            <p className="scene-subtitle">{scene.subtitle}</p>
            <p className="scene-narration">{scene.narration}</p>
          </div>

          <div>
            <div className="progress-row" aria-label="Lesson progress">
              {progressItems.map((id, index) => (
                <span
                  key={id}
                  className={index <= sceneIndex ? 'active' : undefined}
                />
              ))}
            </div>
            <div className="scene-controls">
              <button
                className="north-button"
                type="button"
                onClick={() => setMode('chat')}
              >
                Skip to chat
              </button>
              <button
                className="north-button"
                type="button"
                onClick={replayScene}
              >
                Replay
              </button>
            </div>
          </div>
        </motion.aside>

        <div className="screen-panel" aria-live="polite">
          <div className="mock-toolbar">
            <div className="mock-search">Ask North: how do I use {scene.title}?</div>
            <div className="mock-pill">{scene.tool}</div>
          </div>

          <div className="screen-actions">
            <AnimatePresence>
              {visibleSteps.map((step, index) => (
                <motion.article
                  key={step.id}
                  className="screen-action-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <span>Screen action {index + 1}</span>
                  <p>{step.caption}</p>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep?.id ?? mode}
              className="action-caption"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {mode === 'intro'
                ? 'North is preparing a guided screen lesson.'
                : currentStep?.caption}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {mode === 'checkIn' ? (
          <NorthCheckIn
            scene={scene}
            onContinue={continueToNext}
            onReplay={replayScene}
            onSkip={() => setMode('handoff')}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
