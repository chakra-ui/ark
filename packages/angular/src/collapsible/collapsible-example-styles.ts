export const collapsibleExampleStyles = `
  [arkCollapsible] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 22rem;
    max-width: calc(100vw - 8rem);
    font-family: inherit;
  }

  [arkCollapsibleTrigger] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
    padding: 0.625rem 0.75rem;
    margin: 0;
    border: 1px solid var(--demo-border);
    border-radius: 0.5rem;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    text-align: start;
    color: var(--demo-neutral-fg);
    outline: none;
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
    filter: grayscale(100%);
    cursor: not-allowed;
  }

  [arkCollapsibleIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--demo-neutral-emphasized);
    transition: transform 120ms ease;
    transform-origin: center;
  }

  [arkCollapsibleIndicator][data-state='open'] {
    transform: rotate(90deg);
  }

  [arkCollapsibleIndicator] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkCollapsibleContent] {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;
  }

  [arkCollapsibleContent][data-state='open'] {
    animation:
      collapsible-expand-height 120ms ease-out,
      collapsible-fade-in 120ms ease-out;
  }

  [arkCollapsibleContent][data-state='open'][data-has-collapsed-size] {
    animation-name: collapsible-expand-height;
  }

  [arkCollapsibleContent][data-state='closed'] {
    animation:
      collapsible-collapse-height 120ms ease-out,
      collapsible-fade-out 120ms ease-out;
  }

  [arkCollapsibleContent][data-state='closed'][data-has-collapsed-size] {
    animation-name: collapsible-collapse-height;
    box-shadow: inset 0 -12px 12px -12px rgba(0, 0, 0, 0.5);
  }

  .collapsible-body {
    padding-inline: 0.75rem;
    padding-block: 0.625rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--demo-neutral-fg);
  }

  .collapsible-body p + p {
    margin-top: 0.5rem;
  }

  .collapsible-body code {
    font-family: ui-monospace, monospace;
    font-size: 0.875rem;
    color: var(--demo-neutral-fg);
    background-color: var(--demo-neutral-subtle);
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
  }

  .collapsible-nested {
    margin-top: 0.5rem;
    width: 100%;
  }

  @keyframes collapsible-expand-height {
    from {
      height: var(--collapsed-height, 0);
    }
    to {
      height: var(--height);
    }
  }

  @keyframes collapsible-collapse-height {
    from {
      height: var(--height);
    }
    to {
      height: var(--collapsed-height, 0);
    }
  }

  @keyframes collapsible-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes collapsible-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`
