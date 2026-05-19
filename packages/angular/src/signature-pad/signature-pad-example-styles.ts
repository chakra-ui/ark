export const signaturePadExampleStyles = `
  [arkSignaturePad] {
    display: grid;
    gap: 0.5rem;
    width: min(100%, 28rem);
  }

  [arkSignaturePadLabel] {
    color: var(--demo-neutral-fg, #1c1917);
    font-weight: 500;
  }

  [arkSignaturePadControl] {
    position: relative;
    min-height: 12rem;
    border: 1px solid var(--demo-border, #d6d3d1);
    border-radius: 0.5rem;
    background: var(--demo-bg, #ffffff);
  }

  [arkSignaturePadControl]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkSignaturePadSegment] {
    color: var(--demo-neutral-fg, #1c1917);
  }

  [arkSignaturePadClearTrigger] {
    position: absolute;
    inset-block-start: 0.5rem;
    inset-inline-end: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--demo-border, #d6d3d1);
    border-radius: 0.375rem;
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    cursor: pointer;
  }

  [arkSignaturePadClearTrigger][hidden] {
    display: none;
  }

  [arkSignaturePadClearTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkSignaturePadGuide] {
    position: absolute;
    left: 1rem;
    right: 1rem;
    bottom: 2.5rem;
    border-bottom: 1px dashed var(--demo-border, #d6d3d1);
  }
`
