export const tooltipExampleStyles = `
  [arkTooltipTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    background: var(--demo-bg, #ffffff);
    border: 1px solid var(--demo-border, #d6d3d1);
    cursor: pointer;
  }

  [arkTooltipTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkTooltipPositioner] {
    z-index: 50;
  }

  [arkTooltipContent] {
    background: var(--demo-neutral-fg, #1c1917);
    color: var(--demo-bg, #ffffff);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  [arkTooltipArrow] {
    --arrow-size: 6px;
    --arrow-background: var(--demo-neutral-fg, #1c1917);
  }
`
