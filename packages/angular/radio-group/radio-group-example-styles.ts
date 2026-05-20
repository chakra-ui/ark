export const radioGroupExampleStyles = `
  [arkRadioGroup],
  [arkRadioGroupRootProvider] {
    color: var(--demo-neutral-fg);
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }

  [arkRadioGroup][data-disabled],
  [arkRadioGroupRootProvider][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkRadioGroupLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    user-select: none;
  }

  [arkRadioGroupLabel][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkRadioGroupItem] {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  [arkRadioGroupItem][data-disabled] {
    opacity: 0.5;
  }

  [arkRadioGroupItemControl] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 9999px;
    background: transparent;
  }

  [arkRadioGroupItemControl][data-state='checked'] {
    border-color: var(--demo-coral-solid);
    border-width: 5px;
  }

  [arkRadioGroupItemControl][data-focus-visible] {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  [arkRadioGroupItemControl][data-disabled] {
  }

  [arkRadioGroupItemText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
    user-select: none;
  }

  [arkRadioGroupIndicator] {
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    background: var(--demo-coral-solid);
    border-radius: 9999px;
    transition:
      top 0.15s ease,
      left 0.15s ease;
  }

  .stack {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .hstack {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .button {
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
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
  }

  .button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }
`
