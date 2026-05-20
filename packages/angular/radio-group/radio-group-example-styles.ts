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
    gap: 0.75rem;
  }

  .hstack {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    align-self: flex-start;
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding-inline: 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    white-space: nowrap;
    user-select: none;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: var(--demo-bg-popover, #ffffff);
    color: var(--demo-neutral-fg, #111827);
    cursor: pointer;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  .button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #fb7185);
    outline-offset: -1px;
  }

  .button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
    cursor: not-allowed;
  }
`
