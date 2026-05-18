export const menuExampleStyles = `
  [arkMenuTrigger] {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    background: var(--demo-coral-9, #c7553f);
    color: white;
    border: 1px solid transparent;
    cursor: pointer;
  }

  [arkMenuTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkMenuPositioner] {
    z-index: 50;
  }

  [arkMenuContent] {
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 0.25rem;
    min-width: 12rem;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  [arkMenuItem] {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.5rem;
    font-size: 0.8125rem;
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
  }

  [arkMenuItem][data-highlighted] {
    background: var(--demo-coral-3, #fde6df);
    color: var(--demo-coral-11, #8a2d1a);
  }

  [arkMenuItem][data-disabled] {
    color: var(--demo-neutral-muted, #a8a29e);
    cursor: not-allowed;
  }

  [arkMenuSeparator] {
    height: 1px;
    background: var(--demo-neutral-line, #e7e5e4);
    margin: 0.25rem 0;
  }

  [arkMenuArrow] {
    --arrow-size: 8px;
    --arrow-background: var(--demo-bg, #ffffff);
  }
`
