export const qrCodeExampleStyles = `
  :host {
    display: grid;
    gap: 12px;
    width: fit-content;
  }

  .stack {
    display: grid;
    gap: 12px;
    width: fit-content;
  }

  .hstack {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  [data-scope='qr-code'][data-part='root'] {
    color: var(--demo-neutral-fg);
    --qr-code-size: 100px;
    --qr-code-overlay-size: calc(var(--qr-code-size) / 3);
    position: relative;
    width: fit-content;
    display: flex;
    flex-direction: column;
  }

  [data-scope='qr-code'][data-part='frame'] {
    display: block;
    width: var(--qr-code-size, var(--qrcode-width));
    height: var(--qr-code-size, var(--qrcode-height));
    fill: var(--demo-neutral-fg);
  }

  [data-scope='qr-code'][data-part='pattern'] {
    fill: inherit;
  }

  [data-scope='qr-code'][data-part='overlay'] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--qr-code-overlay-size);
    height: var(--qr-code-overlay-size);
    padding: 0.25rem;
    background: var(--demo-bg-popover);
    border-radius: 0.25rem;
  }

  [data-scope='qr-code'][data-part='overlay'] img,
  [data-scope='qr-code'][data-part='overlay'] svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 40px;
    min-height: 40px;
    padding-inline: 16px;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 6px;
    background: transparent;
    color: var(--demo-neutral-fg);
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .button:hover:not(:disabled, [data-disabled]),
  .button[aria-expanded='true']:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .button:disabled,
  .button[data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .button svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  .radio-input:focus-visible + .radio-control {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  .radio-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--demo-neutral-fg);
    font-size: 14px;
    line-height: 20px;
    user-select: none;
  }

  .radio-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .radio-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 9999px;
    background: transparent;
  }

  .radio-input:checked + .radio-control {
    border-color: var(--demo-coral-solid);
    border-width: 5px;
  }

  .radio-item:has(.radio-input:disabled) {
    opacity: 0.5;
  }
`
