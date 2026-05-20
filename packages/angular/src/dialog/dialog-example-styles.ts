export const dialogExampleStyles = `
  button,
  [arkDialogTrigger],
  [arkDialogCloseTrigger].button {
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
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, var(--demo-border, #d6d3d1));
    color: var(--demo-neutral-fg, #1c1917);
    cursor: pointer;
  }

  button svg,
  [arkDialogTrigger] svg,
  [arkDialogCloseTrigger].button svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  button:has(> svg:only-child),
  [arkDialogTrigger]:has(> svg:only-child),
  [arkDialogCloseTrigger].button:has(> svg:only-child) {
    padding-inline: 0.625rem !important;
  }

  button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]),
  [arkDialogTrigger]:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]),
  [arkDialogCloseTrigger].button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  button[data-variant='solid'],
  [arkDialogTrigger][data-variant='solid'],
  [arkDialogCloseTrigger].button[data-variant='solid'] {
    background: var(--demo-coral-solid, var(--demo-coral-9, #c7553f));
    color: var(--demo-coral-contrast, #ffffff);
    border-color: var(--demo-coral-solid, var(--demo-coral-9, #c7553f));
  }

  button[data-variant='solid']:hover,
  [arkDialogTrigger][data-variant='solid']:hover,
  [arkDialogCloseTrigger].button[data-variant='solid']:hover {
    background: var(--demo-coral-fg, #9f3f2f);
    border-color: var(--demo-coral-fg, #9f3f2f);
  }

  button[data-variant='surface'],
  [arkDialogTrigger][data-variant='surface'],
  [arkDialogCloseTrigger].button[data-variant='surface'] {
    border-color: var(--demo-border-emphasized, var(--demo-border, #d6d3d1));
    color: var(--demo-coral-fg, #9f3f2f);
  }

  button:focus-visible,
  [arkDialogTrigger]:focus-visible,
  [arkDialogCloseTrigger].button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  button[data-variant='solid']:focus-visible,
  [arkDialogTrigger][data-variant='solid']:focus-visible,
  [arkDialogCloseTrigger].button[data-variant='solid']:focus-visible {
    outline-offset: 2px;
  }

  button:is(:disabled, [data-disabled]),
  [arkDialogTrigger]:is(:disabled, [data-disabled]),
  [arkDialogCloseTrigger].button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .stack,
  .button-group {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .stack {
    flex-direction: column;
    align-items: flex-start;
  }

  [arkDialogBackdrop] {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: calc(var(--demo-popover-z-index, 1000) + var(--layer-index, 0));
  }

  [arkDialogBackdrop][data-state='open'] {
    animation: dialog-fade-in 0.15s ease-out;
  }

  [arkDialogBackdrop][data-state='closed'] {
    animation: dialog-fade-out 0.1s ease-in;
  }

  [arkDialogPositioner] {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: calc(var(--demo-popover-z-index, 1000) + var(--layer-index, 0));
    overscroll-behavior-y: none;
    scrollbar-gutter: stable both-edges;
  }

  [arkDialogPositioner].outside-scroll {
    align-items: flex-start;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    pointer-events: auto;
  }

  [arkDialogContent] {
    --px: 1.5rem;

    position: relative;
    background: var(--demo-bg-popover, var(--demo-bg, #ffffff));
    color: var(--demo-neutral-fg, #1c1917);
    border-radius: 0.5rem;
    border: 1px solid var(--demo-border, #d6d3d1);
    box-shadow: var(--demo-shadow-xl, 0 20px 25px rgba(0, 0, 0, 0.15));
    padding: var(--px);
    width: 24rem;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    outline: 0;
    transition: transform 0.1s ease-in-out;
    translate: calc(-1 * var(--scrollbar-width, 0px) / 2) 0;
  }

  [arkDialogContent][data-has-nested] {
    transform: scale(calc(1 - var(--nested-layer-count) * 0.05));
  }

  [arkDialogContent][data-state='open'] {
    animation: dialog-scale-fade-in 0.15s ease-out;
  }

  [arkDialogContent][data-state='closed'] {
    animation: dialog-scale-fade-out 0.1s ease-in;
  }

  [arkDialogTitle] {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
  }

  [arkDialogDescription] {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--demo-neutral-fg-muted, #57534e);
  }

  [arkDialogCloseTrigger]:not(.button) {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.75rem;
    min-height: 1.75rem;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0.25rem;
    color: var(--demo-neutral-emphasized, #78716c);
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  [arkDialogCloseTrigger]:not(.button) svg {
    width: 1rem;
    height: 1rem;
  }

  [arkDialogCloseTrigger]:not(.button):hover {
    background: var(--demo-neutral-muted, #f5f5f4);
  }

  [arkDialogCloseTrigger]:not(.button):focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.5rem;
    width: 100%;
  }

  .field {
    color: var(--demo-neutral-fg, #1c1917);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
    width: 100%;
    max-width: 24rem;
  }

  .field label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #1c1917);
  }

  .field input,
  textarea {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, var(--demo-border, #d6d3d1));
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg, #1c1917);
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  textarea {
    min-height: 5rem;
    resize: vertical;
    scroll-padding-bottom: 0.5rem;
  }

  .field input::placeholder,
  textarea::placeholder {
    color: var(--demo-neutral-emphasized, #78716c);
  }

  .field input:focus,
  textarea:focus {
    border-color: var(--demo-coral-solid, var(--demo-coral-9, #c7553f));
    box-shadow: 0 0 0 1px var(--demo-coral-solid, var(--demo-coral-9, #c7553f));
  }

  .scroll-container {
    flex: 1;
    min-height: 0;
    margin: 1rem calc(-1 * var(--px)) 0;
    padding: 0 var(--px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    scrollbar-width: thin;
    scrollbar-color: var(--demo-neutral-solid, #a8a29e) transparent;
  }

  .scroll-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background-color: var(--demo-neutral-solid, #a8a29e);
    border-radius: 4px;
  }

  .scroll-container::-webkit-scrollbar-thumb:hover {
    background-color: var(--demo-neutral-emphasized, #78716c);
  }

  .scroll-section h3 {
    margin: 0 0 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .scroll-section p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--demo-neutral-fg-muted, #57534e);
  }

  [arkMenuTrigger] {
    gap: 0.25rem;
    padding-block: 0.5rem;
  }

  [arkMenuTrigger]:is(:hover, [data-state='open']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  [arkMenuIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  [arkMenuIndicator] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkMenuContent] {
    --arrow-size: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    min-width: max(var(--reference-width), 10rem);
    max-height: min(var(--available-height, 300px), 300px);
    background: var(--demo-bg-popover, var(--demo-bg, #ffffff));
    border: 1px solid var(--demo-border-emphasized, var(--demo-border, #d6d3d1));
    border-radius: 0.375rem;
    box-shadow: var(--demo-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
    z-index: calc(var(--demo-popover-z-index, 1000) + var(--layer-index, 0));
    outline: none;
    transform-origin: var(--transform-origin);
  }

  [arkMenuContent][data-state='open'] {
    animation: dialog-scale-fade-in 0.15s ease-out;
  }

  [arkMenuContent][data-state='closed'] {
    animation: dialog-scale-fade-out 0.1s ease-in;
  }

  [arkMenuItem] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2rem;
    padding-inline: 0.725rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.25rem;
    user-select: none;
    outline: none;
    color: var(--demo-neutral-fg, #1c1917);
    text-decoration: none;
  }

  [arkMenuItem][data-highlighted] {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  [arkMenuItem][data-disabled] {
    color: var(--demo-neutral-emphasized, #78716c);
    opacity: 0.5;
  }

  [arkMenuSeparator] {
    height: 1px;
    margin-block: 0.25rem;
    border: 0;
    background: var(--demo-border, #d6d3d1);
  }

  @keyframes dialog-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes dialog-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes dialog-scale-fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes dialog-scale-fade-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`
