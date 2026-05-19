export const numberInputExampleStyles = `
  [arkNumberInputRoot], [arkNumberInputRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 240px;
    font-family: inherit;
  }

  [arkNumberInputLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkNumberInputControl] {
    display: inline-flex;
    align-items: stretch;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    overflow: hidden;
  }

  [arkNumberInputInput] {
    flex: 1;
    min-width: 0;
    border: none;
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    font-family: inherit;
    color: inherit;
    background: transparent;
  }

  [arkNumberInputInput]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #f97316);
    outline-offset: -2px;
  }

  [arkNumberInputIncrementTrigger],
  [arkNumberInputDecrementTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border: none;
    border-left: 1px solid var(--demo-border-emphasized, #d1d5db);
    background: transparent;
    cursor: pointer;
  }

  [arkNumberInputScrubber] {
    cursor: ew-resize;
    padding: 0 0.375rem;
    display: inline-flex;
    align-items: center;
    border-right: 1px solid var(--demo-border-emphasized, #d1d5db);
  }
`
