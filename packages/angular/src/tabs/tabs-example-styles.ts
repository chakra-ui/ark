export const tabsExampleStyles = `
  [arkTabs] {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 32rem;
  }

  [arkTabs][data-orientation="vertical"] {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: start;
  }

  [arkTabsList] {
    display: flex;
    gap: 0.25rem;
    border-bottom: 1px solid var(--demo-border, #d6d3d1);
    position: relative;
  }

  [arkTabs][data-orientation="vertical"] [arkTabsList] {
    flex-direction: column;
    border-bottom: 0;
    border-right: 1px solid var(--demo-border, #d6d3d1);
    padding-right: 0.5rem;
  }

  [arkTabsTrigger] {
    appearance: none;
    border: 0;
    border-radius: 0.375rem 0.375rem 0 0;
    background: transparent;
    color: var(--demo-neutral-fg, #1c1917);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    padding: 0.5rem 0.75rem;
  }

  [arkTabs][data-orientation="vertical"] [arkTabsTrigger] {
    border-radius: 0.375rem;
    text-align: left;
  }

  [arkTabsTrigger][data-selected] {
    background: var(--demo-coral-9, #c7553f);
    color: white;
  }

  [arkTabsTrigger]:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  [arkTabsTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkTabsContent] {
    color: var(--demo-neutral-fg, #1c1917);
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 0.75rem 0;
  }

  [arkTabsContent][hidden] {
    display: none;
  }

  [arkTabsIndicator] {
    background: var(--demo-coral-9, #c7553f);
    border-radius: 999px;
    height: 2px;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`
