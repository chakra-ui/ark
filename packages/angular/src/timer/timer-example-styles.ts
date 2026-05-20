export const timerExampleStyles = `
  .timer-stack,
  .timer-root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    color: var(--demo-neutral-fg);
  }

  .timer-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }

  .timer-area {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .timer-item-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .timer-item {
    min-width: 2ch;
    color: var(--demo-neutral-fg);
    font-size: 1.5rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    text-align: center;
  }

  .timer-label {
    color: var(--demo-neutral-emphasized);
    font-size: 0.75rem;
  }

  .timer-separator {
    color: var(--demo-neutral-emphasized);
    font-size: 1.5rem;
    font-weight: 600;
  }

  .timer-control {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .timer-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
    padding-inline: 1rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg);
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
    cursor: pointer;
  }

  .timer-button svg,
  .timer-button timer-play-icon,
  .timer-button timer-pause-icon,
  .timer-button timer-rotate-ccw-icon {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  .timer-button:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .timer-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .timer-button:disabled,
  .timer-button[data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .timer-button[hidden] {
    display: none;
  }

  .timer-output {
    color: var(--demo-neutral-emphasized);
    font-size: 14px;
  }
`
