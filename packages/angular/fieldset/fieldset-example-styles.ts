export const fieldsetExampleStyles = `
  [arkFieldsetRoot], [arkFieldsetRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 480px;
    padding: 1rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.5rem;
    font-family: inherit;
  }

  [arkFieldsetRoot][data-disabled], [arkFieldsetRootProvider][data-disabled] {
    opacity: 0.6;
  }

  [arkFieldsetLegend] {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--demo-neutral-fg, #111827);
    padding: 0 0.25rem;
  }

  [arkFieldsetHelperText] {
    font-size: 0.8125rem;
    color: var(--demo-neutral-muted, #6b7280);
  }

  [arkFieldsetErrorText] {
    font-size: 0.8125rem;
    color: var(--demo-coral-fg, #b91c1c);
  }
`
