export const pinInputExampleStyles = `
  [arkPinInputRoot], [arkPinInputRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: inherit;
  }

  [arkPinInputLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkPinInputControl] {
    display: inline-flex;
    gap: 0.25rem;
  }

  [arkPinInputInput] {
    width: 2rem;
    height: 2.25rem;
    text-align: center;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-family: inherit;
    color: inherit;
    background: transparent;
  }

  [arkPinInputInput]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #f97316);
    outline-offset: -2px;
  }
`
