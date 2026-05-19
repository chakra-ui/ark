export const listboxExampleStyles = `
  [arkListboxRoot], [arkListboxRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: inherit;
  }

  [arkListboxLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkListboxContent] {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    padding: 0.25rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
  }

  [arkListboxItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    cursor: pointer;
  }

  [arkListboxItem][data-highlighted] {
    background: var(--demo-neutral-bg, #f3f4f6);
  }

  [arkListboxItem][data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkListboxItemIndicator][data-state="unchecked"] {
    visibility: hidden;
  }

  [arkListboxItemGroup] {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  [arkListboxItemGroupLabel] {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--demo-neutral-muted, #6b7280);
    padding: 0.25rem 0.5rem;
  }
`
