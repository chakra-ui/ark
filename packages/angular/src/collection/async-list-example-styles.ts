export const asyncListExampleStyles = `
  .root {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--demo-neutral-fg);
    max-width: 32rem;
    width: 100%;
    margin-inline: auto;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .status {
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized);
  }

  .error {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    background: var(--demo-coral-subtle);
    color: var(--demo-coral-fg);
    border-radius: 0.375rem;
  }

  .empty {
    font-size: 0.875rem;
    padding: 1.5rem;
    text-align: center;
    color: var(--demo-neutral-emphasized);
  }

  .item-group {
    display: flex;
    flex-direction: column;
  }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--demo-border);
  }

  .item:last-child {
    border-bottom: none;
  }

  .item:hover {
    background: var(--demo-neutral-subtle);
  }

  .item[data-variant='outline'] {
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .item[data-variant='outline']:last-child {
    margin-bottom: 0;
  }

  .item-media {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--demo-neutral-subtle);
    border: 1px solid var(--demo-border);
    border-radius: 0.375rem;
    overflow: hidden;
  }

  .item-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .item-title {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
  }

  .item-description {
    font-size: 0.875rem;
    line-height: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-meta {
    font-size: 0.75rem;
    color: var(--demo-neutral-emphasized);
    margin-top: 0.25rem;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .table th,
  .table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--demo-border);
  }

  .table th {
    font-weight: 500;
    color: var(--demo-neutral-fg);
    background: var(--demo-neutral-subtle);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }

  .table th:hover {
    background: var(--demo-neutral-muted);
  }

  .table td {
    color: var(--demo-neutral-fg);
  }

  .table tbody tr:hover {
    background: var(--demo-neutral-subtle);
  }

  .table button {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font: inherit;
  }

  .sort-icon {
    display: inline-flex;
    vertical-align: middle;
    width: 0.875rem;
    height: 0.875rem;
    color: var(--demo-neutral-emphasized);
  }

  .sort-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .loading {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized);
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 9999px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
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
    cursor: pointer;
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

  .input,
  .select {
    width: 100%;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  .input::placeholder {
    color: var(--demo-neutral-emphasized);
  }

  .input:focus,
  .select:focus {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }

  .select {
    padding-right: 2rem;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236f6d66' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1rem;
  }
`
