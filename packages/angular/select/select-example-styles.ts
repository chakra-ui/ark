export const selectExampleStyles = `
  [arkSelectRoot], [arkSelectRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: inherit;
  }

  [arkSelectLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkSelectControl] {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  [arkSelectTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-width: 12rem;
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
    cursor: pointer;
  }

  [arkSelectContent] {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    padding: 0.25rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: white;
  }

  [arkSelectItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    cursor: pointer;
  }

  [arkSelectItem][data-highlighted] {
    background: var(--demo-neutral-bg, #f3f4f6);
  }

  [arkSelectItem][data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkSelectItemIndicator][data-state="unchecked"] {
    visibility: hidden;
  }

  [arkSelectItemGroup] {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  [arkSelectItemGroupLabel] {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--demo-neutral-muted, #6b7280);
    padding: 0.25rem 0.5rem;
  }
`
