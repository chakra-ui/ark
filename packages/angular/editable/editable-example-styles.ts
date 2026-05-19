export const editableExampleStyles = `
  [arkEditableRoot], [arkEditableRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 320px;
    font-family: inherit;
  }

  [arkEditableLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkEditableArea] {
    display: flex;
    align-items: center;
  }

  [arkEditableInput],
  [arkEditablePreview] {
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    font-family: inherit;
    color: inherit;
    background: transparent;
    min-width: 0;
  }

  [arkEditableInput]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #f97316);
    outline-offset: 2px;
  }

  [arkEditableControl] {
    display: inline-flex;
    gap: 0.25rem;
  }

  [arkEditableEditTrigger],
  [arkEditableSubmitTrigger],
  [arkEditableCancelTrigger] {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.25rem;
    background: transparent;
    cursor: pointer;
  }
`
