export const timerExampleStyles = `
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
    min-height: 32px;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 6px;
    background: transparent;
    color: var(--demo-neutral-fg);
    font: inherit;
    padding: 0 12px;
    cursor: pointer;
  }

  .timer-button:hover:not(:disabled) {
    background: var(--demo-neutral-subtle);
  }

  .timer-button[hidden] {
    display: none;
  }

  .timer-output {
    color: var(--demo-neutral-emphasized);
    font-size: 14px;
  }
`
