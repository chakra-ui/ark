export const timerExampleStyles = `
  .timer-root {
    display: inline-flex;
    flex-direction: column;
    gap: 12px;
    color: #111827;
  }

  .timer-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }

  .timer-area {
    display: flex;
    align-items: end;
    gap: 8px;
    font-variant-numeric: tabular-nums;
  }

  .timer-item-group {
    display: grid;
    justify-items: center;
    gap: 4px;
  }

  .timer-item {
    display: inline-flex;
    min-width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #ffffff;
    color: #111827;
    font-size: 20px;
    font-weight: 600;
  }

  .timer-label {
    color: #4b5563;
    font-size: 12px;
  }

  .timer-separator {
    display: inline-flex;
    height: 44px;
    align-items: center;
    color: #4b5563;
    font-size: 20px;
    font-weight: 600;
  }

  .timer-control {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .timer-button {
    display: inline-flex;
    min-height: 32px;
    align-items: center;
    justify-content: center;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #ffffff;
    color: #111827;
    font: inherit;
    padding: 0 12px;
    cursor: pointer;
  }

  .timer-button:hover:not(:disabled) {
    background: #f9fafb;
  }

  .timer-button[hidden] {
    display: none;
  }

  .timer-output {
    color: #4b5563;
    font-size: 14px;
  }
`
