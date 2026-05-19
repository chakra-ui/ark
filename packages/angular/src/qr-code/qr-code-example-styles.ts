export const qrCodeExampleStyles = `
  :host {
    display: grid;
    gap: 12px;
    width: fit-content;
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
    fill: currentColor;
  }

  [data-scope='qr-code'][data-part='overlay'] {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    background: white;
    color: black;
    font: 700 12px/1 sans-serif;
  }
`
