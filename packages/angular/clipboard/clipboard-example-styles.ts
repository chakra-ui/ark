export const clipboardExampleStyles = `
  [arkClipboard],
  [arkClipboardRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
    max-width: 20rem;
    font-family: inherit;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
  }

  [arkClipboardLabel] {
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  [arkClipboardControl] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input[arkClipboardInput] {
    flex: 1;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  input[arkClipboardInput]::placeholder {
    color: var(--demo-neutral-emphasized);
  }

  input[arkClipboardInput]:focus {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }

  input[arkClipboardInput][data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkClipboardTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.25rem;
    height: 2.25rem;
    padding: 0 0.5rem;
    gap: 0.5rem;
    font: inherit;
    font-weight: 500;
    line-height: 1.25rem;
    background: transparent;
    color: inherit;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  [arkClipboardTrigger] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkClipboardTrigger]:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  [arkClipboardTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  [arkClipboardTrigger]:disabled,
  [arkClipboardTrigger][data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
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

  .button svg {
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
    cursor: not-allowed;
  }

  [arkClipboardIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  [arkClipboardValueText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`
