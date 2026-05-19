export const tagsInputExampleStyles = `
  [arkTagsInputRoot], [arkTagsInputRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: inherit;
  }

  [arkTagsInputLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkTagsInputControl] {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0.25rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    min-height: 2.25rem;
  }

  [arkTagsInputItem] {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 9999px;
    font-size: 0.8125rem;
    background: var(--demo-neutral-bg, #f3f4f6);
  }

  [arkTagsInputItemDeleteTrigger] {
    background: transparent;
    border: 0;
    cursor: pointer;
    color: inherit;
    padding: 0;
    font-size: 0.875rem;
    line-height: 1;
  }

  [arkTagsInputInput] {
    flex: 1 1 6rem;
    min-width: 6rem;
    border: 0;
    outline: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 0.875rem;
  }
`
