export const downloadTriggerExampleStyles = `
  .root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: fit-content;
  }

  .preview {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-subtle);
  }

  .preview > svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: var(--text-muted);
  }

  .preview-text {
    font-size: 13px;
    color: var(--text-default);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
    cursor: pointer;
  }

  .button > svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  .button:has(> svg:only-child) {
    padding-inline: 0.625rem !important;
  }

  .button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .button[data-variant='surface'] {
    border-color: var(--demo-border-emphasized);
    color: var(--demo-coral-fg);
  }

  .button[data-variant='solid'] {
    background: var(--demo-coral-solid);
    border-color: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
  }

  .button[data-variant='solid']:hover {
    background: var(--demo-coral-fg);
    border-color: var(--demo-coral-fg);
  }

  .button[data-variant='solid']:focus-visible {
    outline-offset: 2px;
  }
`
