export const stepsExampleStyles = `
  :host {
    display: block;
  }

  .steps-root {
    display: grid;
    gap: 1rem;
    max-width: 34rem;
  }

  .steps-root[data-orientation='vertical'] {
    grid-template-columns: 12rem 1fr;
    align-items: start;
  }

  .steps-list {
    display: flex;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .steps-list[data-orientation='vertical'] {
    flex-direction: column;
  }

  .steps-item {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 0.5rem;
  }

  .steps-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 0;
    background: transparent;
    color: #334155;
    font: inherit;
    padding: 0;
  }

  .steps-trigger[data-current] {
    color: #0f172a;
    font-weight: 600;
  }

  .steps-indicator {
    display: grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    border: 1px solid #94a3b8;
    border-radius: 999px;
    background: #fff;
  }

  .steps-indicator[data-current] {
    border-color: #2563eb;
    color: #2563eb;
  }

  .steps-indicator[data-complete] {
    border-color: #059669;
    background: #059669;
    color: #fff;
  }

  .steps-separator {
    height: 1px;
    flex: 1;
    background: #cbd5e1;
  }

  .steps-separator[data-orientation='vertical'] {
    width: 1px;
    min-height: 1.5rem;
    flex: none;
    margin-left: 1rem;
  }

  .steps-content,
  .steps-completed {
    min-height: 6rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .steps-actions {
    display: flex;
    gap: 0.5rem;
  }

  .steps-button {
    min-height: 2.25rem;
    border: 1px solid #94a3b8;
    border-radius: 0.375rem;
    background: #fff;
    color: #0f172a;
    font: inherit;
    padding: 0 0.75rem;
  }

  .steps-button[data-variant='solid'] {
    border-color: #2563eb;
    background: #2563eb;
    color: #fff;
  }

  .steps-button:disabled {
    opacity: 0.45;
  }
`
