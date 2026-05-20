export const popoverExampleStyles = `
  button,
  input,
  textarea {
    font-family: inherit;
  }

  [arkPopoverTrigger],
  .popover-button,
  [arkPopoverCloseTrigger].button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
    padding-inline: 1rem;
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
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border: 1px solid var(--demo-border-emphasized, var(--demo-border, #d6d3d1));
    cursor: pointer;
  }

  [arkPopoverTrigger] svg,
  .popover-button svg,
  [arkPopoverCloseTrigger].button svg {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  [arkPopoverTrigger]:has(> svg:only-child),
  .popover-button:has(> svg:only-child),
  [arkPopoverCloseTrigger].button:has(> svg:only-child) {
    padding-inline: 0.625rem !important;
  }

  [arkPopoverTrigger]:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]),
  .popover-button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]),
  [arkPopoverCloseTrigger].button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  [arkPopoverTrigger]:focus-visible,
  .popover-button:focus-visible,
  [arkPopoverCloseTrigger].button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  [arkPopoverTrigger]:is(:disabled, [data-disabled]),
  .popover-button:is(:disabled, [data-disabled]),
  [arkPopoverCloseTrigger].button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkPopoverTrigger][data-variant='surface'],
  .popover-button[data-variant='surface'],
  [arkPopoverCloseTrigger].button[data-variant='surface'] {
    border-color: var(--demo-border-emphasized, var(--demo-border, #d6d3d1));
    color: var(--demo-coral-fg, #9f3f2f);
  }

  [arkPopoverTrigger][data-variant='solid'],
  .popover-button[data-variant='solid'],
  [arkPopoverCloseTrigger].button[data-variant='solid'] {
    background: var(--demo-coral-solid, var(--demo-coral-9, #c7553f));
    color: var(--demo-coral-contrast, #ffffff);
    border-color: var(--demo-coral-solid, var(--demo-coral-9, #c7553f));
  }

  [arkPopoverTrigger][data-variant='solid']:hover,
  .popover-button[data-variant='solid']:hover,
  [arkPopoverCloseTrigger].button[data-variant='solid']:hover {
    background: var(--demo-coral-fg, #9f3f2f);
    border-color: var(--demo-coral-fg, #9f3f2f);
  }

  [arkPopoverTrigger][data-variant='solid']:focus-visible,
  .popover-button[data-variant='solid']:focus-visible,
  [arkPopoverCloseTrigger].button[data-variant='solid']:focus-visible {
    outline-offset: 2px;
  }

  .stack,
  .button-group,
  .hstack {
    display: flex;
    flex-wrap: wrap;
  }

  .button-group {
    align-items: center;
    gap: 0.5rem;
  }

  .stack {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .hstack {
    align-items: center;
    gap: 0.75rem;
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
    color: var(--demo-neutral-fg, #1c1917);
  }

  [arkPopoverDescription] {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--demo-neutral-fg-muted, #57534e);
  }

  [arkPopoverCloseTrigger] {
    position: absolute;
    top: 4px;
    right: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    background: transparent;
    border: 0;
    color: var(--demo-neutral-emphasized, #44403c);
    cursor: pointer;
  }

  [arkPopoverCloseTrigger] svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
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

  [arkPopoverIndicator] svg {
    width: 1rem;
    height: 1rem;
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

  .field:focus {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
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
