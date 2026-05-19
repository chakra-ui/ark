export const paginationExampleStyles = `
  .pagination-root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    max-width: 40rem;
    color: var(--demo-neutral-fg);
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .pagination-trigger,
  .pagination-item {
    display: inline-flex;
    min-width: 2.25rem;
    height: 2.25rem;
    align-items: center;
    justify-content: center;
    padding-inline: 0.5rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg);
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    user-select: none;
    cursor: pointer;
  }

  .pagination-trigger {
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .pagination-trigger svg,
  .pagination-item svg {
    width: 1rem;
    height: 1rem;
  }

  .pagination-trigger:hover:not(:disabled, [data-disabled]),
  .pagination-item:hover:not(:disabled, [data-disabled], [data-selected]) {
    background: var(--demo-neutral-subtle);
  }

  .pagination-trigger:focus-visible,
  .pagination-item:focus-visible,
  .pagination-page-size select:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .pagination-item[data-selected] {
    border-color: var(--demo-coral-solid);
    background: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
  }

  .pagination-item[data-selected]:hover {
    border-color: var(--demo-coral-emphasized);
    background: var(--demo-coral-emphasized);
  }

  .pagination-trigger:disabled,
  .pagination-trigger[data-disabled],
  .pagination-item:disabled,
  .pagination-item[data-disabled] {
    opacity: 0.5;
  }

  .pagination-ellipsis {
    display: inline-flex;
    min-width: 2.25rem;
    height: 2.25rem;
    align-items: center;
    justify-content: center;
    color: var(--demo-neutral-emphasized);
    font-size: 0.875rem;
    user-select: none;
  }

  .pagination-page-size {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .pagination-page-size select {
    height: 2.25rem;
    padding-inline: 0.5rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg);
    font-family: inherit;
    font-size: 0.875rem;
  }

  .pagination-stack {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pagination-text,
  .pagination-page-count {
    margin: 0;
    color: var(--demo-neutral-fg);
    font-size: 0.875rem;
  }

  .pagination-page-count {
    min-width: 7.5rem;
    text-align: center;
  }

  .pagination-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .pagination-grid-item {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: var(--demo-neutral-subtle);
    color: var(--demo-neutral-fg);
    font-size: 0.875rem;
  }

  .pagination-grid-item-title {
    color: var(--demo-neutral-fg);
    font-weight: 500;
  }

  .pagination-grid-item-text {
    color: var(--demo-neutral-emphasized);
    font-size: 0.8125rem;
  }
`
