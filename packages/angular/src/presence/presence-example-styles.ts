export const presenceExampleStyles = `
  .root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: min(100%, 32rem);
  }

  .ToggleButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding-inline: 1rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    white-space: nowrap;
    user-select: none;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .ToggleButton:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .ToggleButton:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .ToggleButton:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  :host ::ng-deep [data-scope='presence'] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 32rem;
    height: 10rem;
    border: 1px solid var(--demo-border);
    border-radius: 0.25rem;
    background: var(--demo-neutral-subtle);
    color: var(--demo-neutral-fg);
    font-size: 0.875rem;
    font-weight: 500;
  }

  :host ::ng-deep [data-scope='presence'][data-state='open'] {
    animation: presence-fade-in 150ms ease-out;
  }

  :host ::ng-deep [data-scope='presence'][data-state='closed'] {
    animation: presence-fade-out 100ms ease-in;
  }

  @keyframes presence-fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes presence-fade-out {
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
