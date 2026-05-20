export const stepsExampleStyles = `
  :host {
    display: block;
  }

  .stack {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .vstack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  output {
    display: flex;
    max-width: 32rem;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid var(--demo-border-emphasized, #e4e4e3);
    padding: 0.5rem 0.625rem;
    margin-bottom: 0.5rem;
    font-family: monospace;
    max-height: 200px;
    overflow-y: auto;
    font-size: 0.725rem;
  }

  .steps-root {
    color: var(--demo-neutral-fg, #1a1a19);
    --steps-size: 2.5rem;
    --steps-icon-size: 1rem;
    --steps-thickness: 2px;
    --steps-gutter: 0.75rem;
    display: flex;
    width: 100%;
    max-width: 32rem;
  }

  .steps-root[data-orientation='horizontal'] {
    flex-direction: column;
    gap: 1rem;
  }

  .steps-root[data-orientation='vertical'] {
    flex-direction: row;
    min-height: 20rem;
    gap: 3rem;
  }

  .steps-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .steps-list[data-orientation='vertical'] {
    flex-direction: column;
    align-items: flex-start;
  }

  .steps-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1 0 0;
  }

  .steps-item:last-of-type {
    flex: initial;
  }

  .steps-item:last-of-type [data-part='separator'] {
    display: none;
  }

  .steps-item[data-orientation='vertical'] {
    align-items: flex-start;
  }

  .steps-trigger {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0;
    background: transparent;
    border: none;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #1a1a19);
    text-align: start;
    cursor: pointer;
    border-radius: 0.375rem;
  }

  .steps-trigger:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ffb2a8);
    outline-offset: 2px;
  }

  .steps-trigger[data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .steps-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--steps-size);
    height: var(--steps-size);
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 9999px;
  }

  .steps-indicator svg {
    flex-shrink: 0;
    width: var(--steps-icon-size);
    height: var(--steps-icon-size);
  }

  .steps-indicator[data-incomplete] {
    border: var(--steps-thickness) solid var(--demo-border-emphasized, #e4e4e3);
    background: transparent;
    color: var(--demo-neutral-fg, #1a1a19);
  }

  .steps-indicator[data-current] {
    border: var(--steps-thickness) solid var(--demo-coral-solid, #ec5d5e);
    background: var(--demo-coral-muted, #ffdbda);
    color: var(--demo-coral-fg, #c63637);
  }

  .steps-indicator[data-complete] {
    border: var(--steps-thickness) solid var(--demo-coral-solid, #ec5d5e);
    background: var(--demo-coral-solid, #ec5d5e);
    color: var(--demo-coral-contrast, white);
  }

  .steps-separator {
    flex: 1;
    height: var(--steps-thickness);
    background: var(--demo-border-emphasized, #e4e4e3);
    margin-inline: var(--steps-gutter);
  }

  .steps-separator[data-state='complete'] {
    background: var(--demo-coral-solid, #ec5d5e);
  }

  .steps-separator[data-orientation='vertical'] {
    position: absolute;
    width: var(--steps-thickness);
    height: 100%;
    max-height: calc(100% - var(--steps-size) - var(--steps-gutter) * 2);
    top: calc(var(--steps-size) + var(--steps-gutter));
    left: calc(var(--steps-size) / 2 - 1px);
    margin-inline: 0;
  }

  .steps-content {
    padding: 1rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-fg, #1a1a19);
    background: var(--demo-neutral-subtle, #f5f5f4);
    border-radius: 0.5rem;
    min-height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .steps-content:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ffb2a8);
    outline-offset: -2px;
  }

  .steps-content[data-orientation='vertical'] {
    flex: 1;
  }

  .steps-content[hidden] {
    display: none !important;
  }

  .steps-completed {
    padding: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-coral-fg, #c63637);
    background: var(--demo-neutral-subtle, #f5f5f4);
    border-radius: 0.5rem;
    text-align: center;
    min-height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .steps-completed[data-orientation='vertical'] {
    flex: 1;
  }

  .steps-completed[hidden] {
    display: none !important;
  }

  .steps-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .steps-button {
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
    border: 1px solid var(--demo-border-emphasized, #e4e4e3);
    color: var(--demo-neutral-fg, #1a1a19);
    cursor: pointer;
  }

  .steps-button svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  .steps-button:has(> svg:only-child) {
    padding-inline: 0.625rem !important;
  }

  .steps-button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  .steps-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ffb2a8);
    outline-offset: -1px;
  }

  .steps-button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
    cursor: not-allowed;
  }

  .steps-button[data-variant='solid'] {
    background: var(--demo-coral-solid, #ec5d5e);
    border-color: var(--demo-coral-solid, #ec5d5e);
    color: var(--demo-coral-contrast, white);
  }

  .steps-button[data-variant='solid']:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-coral-fg, #c63637);
    border-color: var(--demo-coral-fg, #c63637);
  }

  .steps-button[data-variant='solid']:focus-visible {
    outline-offset: 2px;
  }
`
