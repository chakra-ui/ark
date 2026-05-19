export const clipboardExampleStyles = `
  [arkClipboard],
  [arkClipboardRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: inherit;
    font-size: 0.875rem;
    color: var(--demo-neutral-fg);
  }

  [arkClipboardLabel] {
    font-weight: 500;
  }

  [arkClipboardControl] {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    padding: 0.25rem;
    background: transparent;
  }

  input[arkClipboardInput] {
    flex: 1;
    min-width: 0;
    padding: 0.25rem 0.5rem;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 0;
    outline: 0;
  }

  [arkClipboardTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    font: inherit;
    font-weight: 500;
    background: var(--demo-neutral-subtle);
    color: inherit;
    border: 0;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  [arkClipboardTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  [arkClipboardIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`
