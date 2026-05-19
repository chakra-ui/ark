export const passwordInputExampleStyles = `
  [arkPasswordInputRoot], [arkPasswordInputRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: inherit;
  }

  [arkPasswordInputLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkPasswordInputControl] {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  [arkPasswordInputInput] {
    height: 2.25rem;
    padding: 0 0.5rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-family: inherit;
    color: inherit;
    background: transparent;
  }

  [arkPasswordInputInput]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #f97316);
    outline-offset: -2px;
  }

  [arkPasswordInputVisibilityTrigger] {
    height: 2.25rem;
    padding: 0 0.5rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }
`
