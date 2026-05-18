export const toggleExampleStyles = `
  [arkToggle] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    user-select: none;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
  }

  [arkToggle] svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  [arkToggle]:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  [arkToggle][data-state='on'] {
    background: var(--demo-coral-subtle);
    border-color: var(--demo-coral-muted);
    color: var(--demo-coral-fg);
  }

  [arkToggle]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  [arkToggle]:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkToggleIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`
