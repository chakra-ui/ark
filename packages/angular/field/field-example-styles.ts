export const fieldExampleStyles = `
  [arkFieldRoot], [arkFieldRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 320px;
    font-family: inherit;
  }

  [arkFieldLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkFieldInput], [arkFieldTextarea], [arkFieldSelect] {
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    font-family: inherit;
    color: inherit;
    background: transparent;
  }

  [arkFieldInput]:focus-visible,
  [arkFieldTextarea]:focus-visible,
  [arkFieldSelect]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #f97316);
    outline-offset: 2px;
  }

  [arkFieldInput][data-invalid],
  [arkFieldTextarea][data-invalid],
  [arkFieldSelect][data-invalid] {
    border-color: var(--demo-coral-muted, #fca5a5);
  }

  [arkFieldHelperText] {
    font-size: 0.75rem;
    color: var(--demo-neutral-muted, #6b7280);
  }

  [arkFieldErrorText] {
    font-size: 0.75rem;
    color: var(--demo-coral-fg, #b91c1c);
  }

  [arkFieldRequiredIndicator] {
    color: var(--demo-coral-fg, #b91c1c);
    margin-left: 0.125rem;
  }
`
