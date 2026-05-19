export const popoverExampleStyles = `
  button,
  input,
  textarea {
    font-family: inherit;
  }

  [arkPopoverTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

  button:not([arkPopoverTrigger]):not([arkPopoverCloseTrigger]),
  [arkPopoverCloseTrigger].button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border: 1px solid var(--demo-border, #d6d3d1);
    cursor: pointer;
  }

  button[data-variant='solid'],
  [arkPopoverCloseTrigger].button[data-variant='solid'] {
    background: var(--demo-coral-9, #c7553f);
    color: white;
    border-color: transparent;
  }

  .stack,
  .button-group,
  .hstack {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .stack {
    flex-direction: column;
    align-items: flex-start;
  }

  .hstack {
    align-items: center;
  }

  [arkPopoverTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkPopoverPositioner] {
    z-index: 50;
  }

  [arkPopoverContent] {
    --arrow-background: var(--demo-bg-popover, var(--demo-bg, #ffffff));
    --arrow-size: 10px;
    position: relative;
    background: var(--demo-bg-popover, var(--demo-bg, #ffffff));
    color: var(--demo-neutral-fg, #1c1917);
    border: 1px solid var(--demo-border, #d6d3d1);
    border-radius: 0.25rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    padding: 1.25rem;
    width: max(var(--reference-width, 0px), 20rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    outline: 0;
    transform-origin: var(--transform-origin);
    z-index: calc(var(--demo-popover-z-index, 1000) + var(--layer-index, 0));
  }

  [arkPopoverContent][data-state='open'] {
    animation: popover-scale-fade-in 0.15s ease-in-out;
  }

  [arkPopoverContent][data-state='closed'] {
    animation: popover-scale-fade-out 0.1s ease-in-out;
  }

  [arkPopoverTitle] {
    margin: 0;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.1875rem;
  }

  [arkPopoverDescription] {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--demo-neutral-fg-muted, #57534e);
  }

  [arkPopoverCloseTrigger] {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    background: transparent;
    border: 0;
    border-radius: 0.25rem;
    color: inherit;
    cursor: pointer;
  }

  [arkPopoverCloseTrigger] svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  [arkPopoverCloseTrigger]:hover {
    background: var(--demo-neutral-muted, #f5f5f4);
  }

  [arkPopoverCloseTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  [arkPopoverAnchor] {
    display: inline-flex;
  }

  [arkPopoverIndicator] {
    display: inline-flex;
    margin-inline-start: 4px;
    transition: rotate 200ms ease;
  }

  [arkPopoverArrow] {
    --arrow-size: 10px;
    --arrow-background: var(--demo-bg-popover, var(--demo-bg, #ffffff));
    --arrow-shadow-color: var(--demo-border, #d6d3d1);
  }

  [arkPopoverArrowTip] {
    border-top: 1px solid var(--demo-border, #d6d3d1);
    border-left: 1px solid var(--demo-border, #d6d3d1);
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.75rem;
    width: 100%;
    font-size: 0.875rem;
  }

  .field {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--demo-border, #d6d3d1);
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font: inherit;
  }

  @keyframes popover-scale-fade-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes popover-scale-fade-out {
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
