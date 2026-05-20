export const ratingGroupExampleStyles = `
  [arkRatingGroup],
  [arkRatingGroupRootProvider] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  [arkRatingGroup][data-readonly],
  [arkRatingGroupRootProvider][data-readonly] {
    pointer-events: none;
  }

  [arkRatingGroupLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    user-select: none;
  }

  [arkRatingGroupLabel][data-disabled] {
    opacity: 0.5;
  }

  [arkRatingGroupControl] {
    display: inline-flex;
    align-items: center;
    gap: 0.125rem;
  }

  [arkRatingGroupItem] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  [arkRatingGroupItem][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkRatingGroupItem]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
    border-radius: 0.125rem;
  }

  .rating-group-item-indicator {
    position: relative;
    display: inline-flex;
    width: 1.25rem;
    height: 1.25rem;
  }

  .rating-group-item-indicator svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .rating-group-item-indicator [data-bg] {
    color: var(--demo-neutral-muted);
  }

  .rating-group-item-indicator [data-fg] {
    color: var(--demo-coral-solid);
    clip-path: inset(0 0 0 0);
  }

  .rating-group-item-indicator[data-half] [data-fg] {
    clip-path: inset(0 50% 0 0);
  }

  .rating-group-item-indicator:not([data-highlighted]) [data-fg] {
    clip-path: inset(0 100% 0 0);
  }

  .demo-button {
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

  .demo-button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .demo-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .demo-button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldRoot] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
    width: 100%;
    max-width: 24rem;
  }

  [arkFieldRoot][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldHelperText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg-muted);
  }

  [arkFieldErrorText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-coral-fg);
  }
`
