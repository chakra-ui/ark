export const dialogExampleStyles = `
  [arkDialogTrigger] {
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

  button {
    font-family: inherit;
  }

  button:not([arkDialogTrigger]):not([arkDialogCloseTrigger]),
  [arkDialogCloseTrigger].button {
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
  [arkDialogCloseTrigger].button[data-variant='solid'] {
    background: var(--demo-coral-9, #c7553f);
    color: white;
    border-color: transparent;
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

  [arkDialogTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
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
    max-width: 24rem;
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

  [arkDialogCloseTrigger] {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
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

  [arkDialogCloseTrigger] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkDialogCloseTrigger]:hover {
    background: var(--demo-neutral-muted, #f5f5f4);
  }

  [arkDialogCloseTrigger]:focus-visible {
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
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
  }

  .field label {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .field input,
  textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--demo-border, #d6d3d1);
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font: inherit;
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
