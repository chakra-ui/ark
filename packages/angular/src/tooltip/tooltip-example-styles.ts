export const tooltipExampleStyles = `
  [arkTooltipTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    padding-block: 0.5rem;
    padding-inline: 1rem;
    border-radius: 0.375rem;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, #d6d3d1);
    color: var(--demo-neutral-fg, #1c1917);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  [arkTooltipTrigger]:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  [arkTooltipTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  [arkTooltipTrigger]:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkTooltipContent] {
    --arrow-background: var(--demo-bg-popover, #1c1917);
    --arrow-size: 10px;
    position: relative;
    background: var(--demo-bg-popover, #1c1917);
    color: var(--demo-neutral-fg, #1c1917);
    border-radius: 0.25rem;
    border: 1px solid var(--demo-border-muted, #44403c);
    padding-block: 0.25rem;
    padding-inline: 0.625rem;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.25rem;
    max-width: 20rem;
    box-shadow: var(--demo-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
    z-index: calc(var(--demo-popover-z-index, 50) + var(--layer-index, 0));
    transform-origin: var(--transform-origin);
  }

  .Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, #d6d3d1);
    color: var(--demo-neutral-fg, #1c1917);
    cursor: pointer;
  }

  .Button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  .Button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  .Button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkTooltipContent][data-state='open'] {
    animation: tooltip-scale-fade-in 0.15s ease-out;
  }

  [arkTooltipContent][data-state='closed'] {
    animation: tooltip-scale-fade-out 0.1s ease-in;
  }

  [arkTooltipArrowTip] {
    border-top: 1px solid var(--demo-border-muted, #44403c);
    border-left: 1px solid var(--demo-border-muted, #44403c);
  }

  .Toolbar {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem;
    border: 1px solid var(--demo-border, #d6d3d1);
    border-radius: 0.5rem;
    background: var(--demo-bg-popover, #ffffff);
  }

  .ToolbarButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    padding: 0;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg, #1c1917);
    cursor: pointer;
    transition: background 150ms;
  }

  .ToolbarButton svg {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    width: 1rem;
    height: 1rem;
  }

  .ToolbarButton:hover {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  .Shortcut {
    color: var(--demo-neutral-emphasized, #78716c);
    font-size: 0.6875rem;
  }

  .FixedContainer {
    position: fixed;
    top: 40px;
    left: 40px;
    padding: 40px;
    background: red;
  }

  @keyframes tooltip-scale-fade-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes tooltip-scale-fade-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.96);
    }
  }
`
