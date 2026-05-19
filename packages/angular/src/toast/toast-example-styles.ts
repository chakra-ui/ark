export const toastExampleStyles = `
  .toast-demo,
  .hstack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .toast-button {
    border: 1px solid #d4d4d8;
    border-radius: 6px;
    background: #fff;
    color: #18181b;
    font: inherit;
    padding: 8px 12px;
    cursor: pointer;
  }

  .toast-button:hover {
    background: #f4f4f5;
  }

  [data-scope='toast'][data-part='group'] {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(360px, calc(100vw - 32px));
  }

  .Root,
  [data-scope='toast'][data-part='root'] {
    width: 100%;
    min-width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
    position: relative;
    padding-block: 1rem;
    padding-inline-start: 1rem;
    padding-inline-end: 2.5rem;
    border-radius: 0.5rem;

    translate: var(--x) var(--y);
    scale: var(--scale);
    z-index: var(--z-index);
    height: var(--height);
    opacity: var(--opacity);

    will-change: translate, opacity, scale;
    transition:
      translate 400ms,
      scale 400ms,
      opacity 400ms,
      height 400ms,
      box-shadow 200ms;
    transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);

    background: #fff;
    color: #18181b;

    --toast-trigger-bg: #f4f4f5;
    --toast-accent: #18181b;
  }

  .Root[data-placement^='top'],
  [data-scope='toast'][data-part='root'][data-placement^='top'] {
    box-shadow:
      0 -4px 12px rgb(0 0 0 / 10%),
      0 0 1px rgb(0 0 0 / 20%);
  }

  .Root[data-placement^='bottom'],
  [data-scope='toast'][data-part='root'][data-placement^='bottom'] {
    box-shadow:
      0 4px 12px rgb(0 0 0 / 10%),
      0 0 1px rgb(0 0 0 / 20%);
  }

  .Root[data-state='closed'],
  [data-scope='toast'][data-part='root'][data-state='closed'] {
    transition:
      translate 400ms,
      scale 400ms,
      opacity 200ms;
    transition-timing-function: cubic-bezier(0.06, 0.71, 0.55, 1);
  }

  .Root[data-type='info'],
  [data-scope='toast'][data-part='root'][data-type='info'] {
    --toast-accent: #2563eb;
  }

  .Root[data-type='loading'],
  [data-scope='toast'][data-part='root'][data-type='loading'] {
    --toast-accent: #6b7280;
  }

  .Root[data-type='success'],
  [data-scope='toast'][data-part='root'][data-type='success'] {
    background: #16a34a;
    color: white;
    --toast-accent: white;
    --toast-trigger-bg: rgb(255 255 255 / 15%);
  }

  .Root[data-type='error'],
  [data-scope='toast'][data-part='root'][data-type='error'] {
    background: #dc2626;
    color: white;
    --toast-accent: white;
    --toast-trigger-bg: rgb(255 255 255 / 15%);
  }

  .Root[data-type='warning'],
  [data-scope='toast'][data-part='root'][data-type='warning'] {
    background: #ea580c;
    color: white;
    --toast-accent: white;
    --toast-trigger-bg: rgb(255 255 255 / 15%);
  }

  .Title {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .Description {
    display: inline;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0;
    opacity: 0.8;
  }

  .Indicator {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    color: var(--toast-accent);
  }

  .Indicator svg {
    width: 100%;
    height: 100%;
  }

  .Indicator[data-type='loading'] {
    animation: spin 1s linear infinite;
  }

  .ActionTrigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding-inline: 0.625rem;
    padding-block: 0.25rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1rem;
    border-radius: 0.25rem;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;

    background: transparent;
    border: 1px solid currentColor;
    color: inherit;
  }

  .ActionTrigger:hover {
    background: var(--toast-trigger-bg);
  }

  .ActionTrigger:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  .CloseTrigger {
    position: absolute;
    top: 0.25rem;
    inset-inline-end: 0.25rem;
    padding: 0.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    opacity: 0.6;
    border-radius: 0.25rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: background 200ms;
  }

  .CloseTrigger svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  .CloseTrigger:hover {
    opacity: 1;
    background: var(--toast-trigger-bg);
  }

  .CloseTrigger:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -1px;
  }

  .toast-inline-content {
    flex: 1;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
