'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GeminiMockUI } from './GeminiMockUI';
import { NORTH_SCENES } from '../lib/northScenes';
import { NorthCheckIn } from './NorthCheckIn';
import { NorthChat } from './NorthChat';

type SceneMode = 'intro' | 'scene' | 'checkIn' | 'handoff' | 'chat';

const INTRO_DURATION_MS = 800;
const HANDOFF_DURATION_MS = 1500;
const DEFAULT_AUTO_ADVANCE_MS = 14000;

export function NorthScenes() {
  const [mode, setMode] = useState<SceneMode>('intro');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const scene = NORTH_SCENES[sceneIndex];
  const currentStep = scene?.steps[stepIndex];
  const autoAdvanceMs = currentStep?.autoAdvanceMs ?? DEFAULT_AUTO_ADVANCE_MS;

  const scenePills = useMemo(
    () =>
      NORTH_SCENES.map((item, index) => ({
        id: item.id,
        label: `${index + 1}. ${item.title}`,
      })),
    [],
  );

  const startScene = useCallback(() => {
    setMode('scene');
    setStepIndex(0);
  }, []);

  const jumpToScene = useCallback((nextSceneIndex: number) => {
    setSceneIndex(nextSceneIndex);
    setStepIndex(0);
    setMode('scene');
  }, []);

  const advanceStep = useCallback(() => {
    if (!scene) {
      return;
    }

    if (stepIndex >= scene.steps.length - 1) {
      setMode('checkIn');
      return;
    }

    setStepIndex((index) => index + 1);
  }, [scene, stepIndex]);

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
    if (mode !== 'scene' || !currentStep) {
      return;
    }

    const timer = window.setTimeout(advanceStep, autoAdvanceMs);
    return () => window.clearTimeout(timer);
  }, [advanceStep, autoAdvanceMs, currentStep, mode]);

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
            <h2>Now you try North.</h2>
            <p>
              The guided screen gave you the map. The chat is where North can
              help with your exact AI learning goal.
            </p>
            <p className="scene-narration">Opening chat...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="scene-stage">
      <nav style={styles.sceneSelector} aria-label="Jump to a Gemini lesson">
        {scenePills.map((pill, index) => (
          <button
            key={pill.id}
            type="button"
            onClick={() => jumpToScene(index)}
            style={{
              ...styles.scenePill,
              ...(index === sceneIndex ? styles.activeScenePill : {}),
            }}
          >
            {pill.label}
          </button>
        ))}
      </nav>

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

            <AnimatePresence mode="wait">
              <motion.article
                key={currentStep?.id ?? mode}
                style={styles.explanationCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <h3 style={styles.explanationTitle}>{currentStep?.caption}</h3>
                <p style={styles.explanationText}>{currentStep?.explanation}</p>
                <div style={styles.stepMeta}>
                  Step {stepIndex + 1} of {scene.steps.length}
                </div>
                <div style={styles.progressTrack} aria-hidden="true">
                  <motion.div
                    key={currentStep?.id}
                    style={styles.progressFill}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: autoAdvanceMs / 1000,
                      ease: 'linear',
                    }}
                  />
                </div>
                <button
                  className="north-button primary"
                  type="button"
                  onClick={advanceStep}
                  style={styles.nextButton}
                >
                  Got it → Next
                </button>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="scene-controls">
            <button
              className="north-button"
              type="button"
              onClick={() => setMode('handoff')}
            >
              Skip to chat
            </button>
            <button className="north-button" type="button" onClick={replayScene}>
              Replay scene
            </button>
          </div>
        </motion.aside>

        <div className="screen-panel" aria-live="polite">
          <GeminiMockUI
            activeTargetNorthId={currentStep?.targetNorthId}
            tool={scene.tool}
            title={scene.title}
          />
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

const styles = {
  sceneSelector: {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    padding: '0 0 16px',
    scrollbarWidth: 'thin',
  },
  scenePill: {
    flex: '0 0 auto',
    minHeight: 34,
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 999,
    padding: '0 12px',
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(226,232,240,0.76)',
    font: 'inherit',
    fontSize: 12,
    fontWeight: 760,
    cursor: 'pointer',
  },
  activeScenePill: {
    borderColor: 'rgba(103,232,249,0.5)',
    background: 'rgba(14,116,144,0.26)',
    color: '#f8fafc',
  },
  explanationCard: {
    marginTop: 22,
    border: '1px solid rgba(103,232,249,0.2)',
    borderRadius: 14,
    padding: 18,
    background: 'rgba(2,6,23,0.54)',
    boxShadow: '0 18px 70px rgba(0,0,0,0.2)',
  },
  explanationTitle: {
    margin: 0,
    color: '#f8fafc',
    fontSize: 22,
    lineHeight: 1.2,
    fontWeight: 800,
  },
  explanationText: {
    margin: '12px 0 0',
    color: 'rgba(226,232,240,0.84)',
    fontSize: 15,
    lineHeight: 1.65,
  },
  stepMeta: {
    marginTop: 14,
    color: 'rgba(148,163,184,0.82)',
    fontSize: 12,
    fontWeight: 760,
  },
  progressTrack: {
    overflow: 'hidden',
    height: 6,
    marginTop: 10,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.12)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    background: 'linear-gradient(90deg, #67e8f9, #a78bfa)',
  },
  nextButton: {
    marginTop: 16,
  },
} satisfies Record<string, CSSProperties>;
