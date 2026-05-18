export const collapsibleExampleStyles = `
  [arkCollapsible] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 320px;
    font-family: inherit;
  }

  [arkCollapsibleTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    user-select: none;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
    cursor: pointer;
  }

  [arkCollapsibleTrigger]:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  [arkCollapsibleTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  [arkCollapsibleTrigger]:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkCollapsibleIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 200ms;
  }

  [arkCollapsibleIndicator][data-state='open'] {
    transform: rotate(90deg);
  }

  [arkCollapsibleIndicator] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkCollapsibleContent] {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-fg);
  }

  [arkCollapsibleContent][data-state='closed'] {
    display: none;
  }
`
