export const pinInputExampleStyles = `
  [arkPinInputRoot], [arkPinInputRootProvider] {
    color: var(--demo-neutral-fg, #111827);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    font-family: inherit;
  }

  [arkPinInputLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkPinInputControl] {
    display: inline-flex;
    gap: 0.5rem;
  }

  [arkPinInputInput] {
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.375rem;
    border: 1px solid var(--demo-border, #d1d5db);
    background-color: transparent;
    color: var(--demo-neutral-fg, #111827);
    outline: none;
    font-family: inherit;
  }

  [arkPinInputInput]::placeholder {
    color: var(--demo-neutral-solid, #6b7280);
  }

  [arkPinInputInput]:focus-visible {
    border-color: var(--demo-coral-solid, #f97316);
    box-shadow: 0 0 0 1px var(--demo-coral-solid, #f97316);
  }

  [arkPinInputInput][data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkPinInputInput][data-invalid] {
    border-color: var(--demo-error, #ef4444);
  }

  [arkPinInputInput][data-invalid]:focus-visible {
    border-color: var(--demo-error, #ef4444);
    box-shadow: 0 0 0 1px var(--demo-error, #ef4444);
  }

  [arkFieldRoot] {
    color: var(--demo-neutral-fg, #111827);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
    width: 100%;
    max-width: 24rem;
  }

  [arkFieldRoot][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldHelperText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg-muted, #6b7280);
  }

  [arkFieldErrorText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-coral-fg, #ea580c);
  }
`
