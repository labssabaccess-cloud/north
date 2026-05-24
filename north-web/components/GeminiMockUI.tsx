'use client';

import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import type { NorthTool } from '../lib/northScenes';

type GeminiMockUIProps = {
  activeTargetNorthId?: string;
  tool: NorthTool;
  title: string;
};

type HighlightableProps = {
  id: string;
  activeTargetNorthId?: string;
  children: ReactNode;
  style?: CSSProperties;
};

function Highlightable({
  id,
  activeTargetNorthId,
  children,
  style,
}: HighlightableProps) {
  const isActive = id === activeTargetNorthId;

  return (
    <div
      data-north-id={id}
      style={{
        position: 'relative',
        borderRadius: 12,
        transition: 'box-shadow 220ms ease, border-color 220ms ease',
        boxShadow: isActive
          ? '0 0 0 1px rgba(103,232,249,0.95), 0 0 30px rgba(103,232,249,0.45), 0 0 70px rgba(167,139,250,0.28)'
          : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function GeminiMockUI({
  activeTargetNorthId,
  tool,
  title,
}: GeminiMockUIProps) {
  return (
    <div style={styles.shell} aria-label="Gemini mock interface">
      <div style={styles.topBar}>
        <Highlightable id="model-selector" activeTargetNorthId={activeTargetNorthId}>
          <button type="button" style={styles.modelButton}>
            Gemini Flash
            <span style={styles.chevron}>⌄</span>
          </button>
        </Highlightable>
        <span style={styles.modeBadge}>{tool}</span>
      </div>

      <div style={styles.contentArea}>
        <motion.div
          style={styles.answerCard}
          animate={{ opacity: [0.78, 1, 0.78] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <strong>{title}</strong>
          <p>
            Gemini turns a natural question into a structured answer, then lets
            you refine the result through follow-up prompts.
          </p>
        </motion.div>

        <div style={styles.toolGrid}>
          <Highlightable id="deep-research-item" activeTargetNorthId={activeTargetNorthId}>
            <div style={styles.menuItem}>Deep Research</div>
          </Highlightable>
          <Highlightable id="canvas-item" activeTargetNorthId={activeTargetNorthId}>
            <div style={styles.menuItem}>Canvas</div>
          </Highlightable>
          <Highlightable id="create-image-item" activeTargetNorthId={activeTargetNorthId}>
            <div style={styles.menuItem}>Create Image</div>
          </Highlightable>
          <Highlightable id="create-music-item" activeTargetNorthId={activeTargetNorthId}>
            <div style={styles.menuItem}>Create Music</div>
          </Highlightable>
          <Highlightable id="upload-files-item" activeTargetNorthId={activeTargetNorthId}>
            <div style={styles.menuItem}>Upload files</div>
          </Highlightable>
        </div>
      </div>

      <div style={styles.composer}>
        <Highlightable id="plus-button" activeTargetNorthId={activeTargetNorthId}>
          <button type="button" style={styles.iconButton} aria-label="Open plus menu">
            +
          </button>
        </Highlightable>
        <Highlightable
          id="search-bar"
          activeTargetNorthId={activeTargetNorthId}
          style={{ flex: 1 }}
        >
          <div style={styles.searchBar}>Ask Gemini anything about AI workflows...</div>
        </Highlightable>
        <Highlightable id="mic-button" activeTargetNorthId={activeTargetNorthId}>
          <button type="button" style={styles.iconButton} aria-label="Start voice mode">
            ◦
          </button>
        </Highlightable>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    minHeight: 520,
    gap: 18,
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  modelButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minHeight: 38,
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '0 12px',
    background: 'rgba(15,23,42,0.84)',
    color: '#f8fafc',
    font: 'inherit',
    fontWeight: 760,
  },
  chevron: {
    color: 'rgba(226,232,240,0.64)',
  },
  modeBadge: {
    border: '1px solid rgba(103,232,249,0.22)',
    borderRadius: 999,
    padding: '8px 11px',
    color: 'rgba(207,250,254,0.9)',
    background: 'rgba(14,116,144,0.18)',
    fontSize: 12,
    fontWeight: 800,
  },
  contentArea: {
    display: 'grid',
    gap: 16,
    alignContent: 'start',
  },
  answerCard: {
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 18,
    background: 'rgba(15,23,42,0.74)',
    color: 'rgba(248,250,252,0.94)',
    lineHeight: 1.55,
  },
  toolGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 10,
  },
  menuItem: {
    border: '1px solid rgba(255,255,255,0.11)',
    borderRadius: 12,
    padding: 14,
    background: 'rgba(2,6,23,0.55)',
    color: 'rgba(226,232,240,0.86)',
    fontSize: 14,
    fontWeight: 760,
  },
  composer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 18,
    padding: 10,
    background: 'rgba(2,6,23,0.74)',
  },
  iconButton: {
    width: 38,
    height: 38,
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.08)',
    color: '#f8fafc',
    font: 'inherit',
    fontSize: 19,
    fontWeight: 800,
  },
  searchBar: {
    minHeight: 42,
    border: '1px solid rgba(103,232,249,0.2)',
    borderRadius: 12,
    padding: '12px 14px',
    background: 'rgba(15,23,42,0.88)',
    color: 'rgba(226,232,240,0.68)',
    fontSize: 14,
  },
} satisfies Record<string, CSSProperties>;
