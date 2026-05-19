export const carouselExampleStyles = `
  :host {
    display: block;
    max-width: 520px;
  }

  [data-scope='carousel'][data-part='root'] {
    display: grid;
    gap: 12px;
  }

  [data-scope='carousel'][data-part='item-group'] {
    border: 1px solid #d4d4d8;
    border-radius: 8px;
  }

  [data-scope='carousel'][data-part='item'] {
    min-height: 180px;
    display: grid;
    place-items: center;
    background: #f4f4f5;
    color: #18181b;
    font: 600 32px/1 system-ui, sans-serif;
  }

  [data-scope='carousel'][data-part='control'],
  [data-scope='carousel'][data-part='indicator-group'] {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  button {
    border: 1px solid #a1a1aa;
    border-radius: 6px;
    background: #ffffff;
    color: #18181b;
    padding: 6px 10px;
  }

  button[data-current] {
    background: #18181b;
    color: #ffffff;
  }

  button:disabled {
    opacity: 0.45;
  }
`
