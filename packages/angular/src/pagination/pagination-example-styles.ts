export const paginationExampleStyles = `
  .pagination-root {
    display: inline-flex;
    flex-direction: column;
    gap: 12px;
    color: #111827;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pagination-trigger,
  .pagination-item {
    display: inline-flex;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #ffffff;
    color: #111827;
    font: inherit;
    cursor: pointer;
  }

  .pagination-item[data-selected] {
    border-color: #111827;
    background: #111827;
    color: #ffffff;
  }

  .pagination-trigger:disabled,
  .pagination-trigger[data-disabled] {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .pagination-ellipsis {
    display: inline-flex;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    color: #6b7280;
  }

  .pagination-page-size {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pagination-page-size select {
    height: 32px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #ffffff;
  }

  .pagination-text {
    color: #4b5563;
    font-size: 14px;
  }
`
