export const fieldExampleStyles = `
  [arkFieldRoot], [arkFieldRootProvider] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
    width: 100%;
    max-width: 24rem;
    font-family: inherit;
  }

  [arkFieldRoot][data-disabled],
  [arkFieldRootProvider][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  [arkFieldInput], [arkFieldTextarea], [arkFieldSelect] {
    width: 100%;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  [arkFieldInput]::placeholder,
  [arkFieldTextarea]::placeholder {
    color: var(--demo-neutral-emphasized);
  }

  [arkFieldInput]:focus,
  [arkFieldTextarea]:focus,
  [arkFieldSelect]:focus {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }

  [arkFieldInput][data-invalid],
  [arkFieldTextarea][data-invalid],
  [arkFieldSelect][data-invalid] {
    border-color: var(--demo-coral-fg);
  }

  [arkFieldInput][data-invalid]:focus,
  [arkFieldTextarea][data-invalid]:focus,
  [arkFieldSelect][data-invalid]:focus {
    border-color: var(--demo-coral-fg);
    box-shadow: 0 0 0 1px var(--demo-coral-fg);
  }

  [arkFieldTextarea] {
    min-height: 5rem;
    resize: vertical;
    scroll-padding-bottom: 0.5rem;
  }

  [arkFieldSelect] {
    padding-right: 2rem;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236f6d66' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1rem;
  }

  [arkFieldHelperText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg-muted);
  }

  [arkFieldErrorText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-coral-fg);
  }

  [arkFieldRequiredIndicator] {
    color: var(--demo-coral-fg);
    margin-left: 0.125rem;
  }

  .field-demo-stack {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
  }

  .field-demo-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding-inline: 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
    white-space: nowrap;
    user-select: none;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .field-demo-button:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .field-demo-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }
`
