export const toastExampleStyles = `
  .toast-demo {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .toast-button,
  .toast-action,
  .toast-close {
    border: 1px solid #d4d4d8;
    border-radius: 6px;
    background: #fff;
    color: #18181b;
    font: inherit;
    padding: 8px 12px;
    cursor: pointer;
  }

  .toast-button:hover,
  .toast-action:hover,
  .toast-close:hover {
    background: #f4f4f5;
  }

  [data-scope='toast'][data-part='group'] {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(360px, calc(100vw - 32px));
  }

  [data-scope='toast'][data-part='root'] {
    border: 1px solid #d4d4d8;
    border-left: 4px solid #2563eb;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 16px 40px rgb(24 24 27 / 14%);
    color: #18181b;
    padding: 14px;
  }

  [data-scope='toast'][data-part='title'] {
    font-weight: 650;
    margin-bottom: 4px;
  }

  [data-scope='toast'][data-part='description'] {
    color: #52525b;
    font-size: 14px;
    line-height: 1.4;
  }

  .toast-footer {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 12px;
  }
`
