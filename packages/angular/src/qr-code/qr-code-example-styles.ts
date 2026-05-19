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
    width: var(--qrcode-width);
    height: var(--qrcode-height);
  }

  [data-scope='qr-code'][data-part='frame'] {
    display: block;
    width: var(--qrcode-width);
    height: var(--qrcode-height);
  }

  [data-scope='qr-code'][data-part='pattern'] {
    fill: inherit;
  }

  [data-scope='qr-code'][data-part='overlay'] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 4px;
    background: white;
    border-radius: 4px;
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
    white-space: nowrap;
    cursor: pointer;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .button:hover {
    background: var(--demo-neutral-subtle);
  }

  .button:focus-visible,
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
`
