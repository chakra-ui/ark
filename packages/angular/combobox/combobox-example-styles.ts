export const comboboxExampleStyles = `
  [arkComboboxRoot], [arkComboboxRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: inherit;
  }

  [arkComboboxLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkComboboxControl] {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  [arkComboboxInput] {
    min-width: 12rem;
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
  }

  [arkComboboxContent] {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    padding: 0.25rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: white;
  }

  [arkComboboxItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    cursor: pointer;
  }

  [arkComboboxItem][data-highlighted] {
    background: var(--demo-neutral-bg, #f3f4f6);
  }

  [arkComboboxItem][data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkComboboxItemIndicator][data-state="unchecked"] {
    visibility: hidden;
  }

  [arkComboboxItemGroup] {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  [arkComboboxItemGroupLabel] {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--demo-neutral-muted, #6b7280);
    padding: 0.25rem 0.5rem;
  }

  [arkComboboxEmpty] {
    padding: 0.5rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-muted, #6b7280);
  }

  .combobox-indicators {
    display: inline-flex;
    align-items: center;
    gap: 0.125rem;
  }

  .combobox-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    min-height: 1.5rem;
    align-items: center;
  }

  .combobox-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    background: var(--demo-neutral-bg, #f3f4f6);
    color: var(--demo-neutral-fg, #111827);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .combobox-tag-placeholder {
    color: var(--demo-neutral-muted, #6b7280);
    font-size: 0.75rem;
  }

  .combobox-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-muted, #6b7280);
  }

  .combobox-item-title {
    display: block;
    font-weight: 500;
  }

  .combobox-item-subtitle {
    display: block;
    font-size: 0.75rem;
    color: var(--demo-neutral-muted, #6b7280);
  }

  [arkComboboxItem] mark {
    background: transparent;
    color: inherit;
    font-weight: 600;
    text-decoration: underline;
  }
`
