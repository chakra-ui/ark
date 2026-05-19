export const signaturePadExampleStyles = `
  [arkSignaturePad], [arkSignaturePadRootProvider] {
    color: var(--demo-neutral-fg, #1c1917);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: min(100%, 20rem);
    --signature-pad-height: 10rem;
  }

  [arkSignaturePad][data-disabled],
  [arkSignaturePadRootProvider][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkSignaturePadLabel] {
    color: var(--demo-neutral-fg, #1c1917);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
  }

  [arkSignaturePadControl] {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: var(--signature-pad-height);
    border: 1px solid var(--demo-border-emphasized, #a8a29e);
    border-radius: 0.5rem;
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  [arkSignaturePadControl][data-disabled] {
    cursor: not-allowed;
  }

  [arkSignaturePadSegment] {
    width: 100%;
    height: 100%;
    min-height: var(--signature-pad-height);
    color: var(--demo-neutral-fg, #1c1917);
    touch-action: none;
  }

  [arkSignaturePadSegment]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -2px;
  }

  [arkSignaturePadSegment] path {
    fill: var(--demo-neutral-fg, #1c1917);
  }

  [arkSignaturePadClearTrigger] {
    position: absolute;
    inset-block-start: 0.75rem;
    inset-inline-end: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    font-family: inherit;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-emphasized, #57534e);
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }

  [arkSignaturePadClearTrigger][hidden] {
    display: none;
  }

  [arkSignaturePadClearTrigger]:hover {
    background: var(--demo-neutral-muted, #e7e5e4);
    color: var(--demo-neutral-fg, #1c1917);
  }

  [arkSignaturePadClearTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkSignaturePadClearTrigger]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkSignaturePadGuide] {
    position: absolute;
    inset-inline: 1.5rem;
    bottom: 1.5rem;
    border-bottom: 1px dashed var(--demo-border-emphasized, #a8a29e);
    pointer-events: none;
  }

  .signature-pad-image {
    width: 100%;
    height: auto;
    max-width: 20rem;
    border: 1px solid var(--demo-border-emphasized, #a8a29e);
    border-radius: 0.5rem;
  }
`
