export const interactionExampleStyles = `
  .container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    font-family: system-ui, sans-serif;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 500;
    background: #f0f0f0;
    color: #333;
    width: fit-content;
  }

  .badge[data-modality='keyboard'] {
    background: #dbeafe;
    color: #1d4ed8;
  }

  .badge[data-modality='pointer'] {
    background: #dcfce7;
    color: #15803d;
  }

  .badge[data-modality='virtual'] {
    background: #fef3c7;
    color: #b45309;
  }

  .hint,
  .status {
    font-size: 14px;
    color: #666;
  }

  .button {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-size: 14px;
    width: fit-content;
    outline: none;
  }

  .button:hover {
    background: #f9fafb;
  }

  .button[data-focus-visible] {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label {
    font-size: 14px;
    font-weight: 500;
  }

  .input {
    padding: 6px 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
  }

  .input[data-focus-visible] {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`
