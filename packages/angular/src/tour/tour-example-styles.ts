export const tourExampleStyles = `
  .tour-root {
    display: grid;
    gap: 1rem;
    max-width: 42rem;
  }

  .tour-targets {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .tour-target {
    border: 1px solid #d4d4d8;
    border-radius: 6px;
    padding: 1rem;
    background: #fafafa;
  }

  .tour-backdrop {
    background: rgb(0 0 0 / 0.35);
  }

  .tour-positioner {
    z-index: 40;
  }

  .tour-content {
    width: min(22rem, calc(100vw - 2rem));
    border: 1px solid #d4d4d8;
    border-radius: 6px;
    padding: 1rem;
    background: white;
    box-shadow: 0 16px 40px rgb(0 0 0 / 0.18);
  }

  .tour-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .tour-description {
    margin: 0.5rem 0 0;
    color: #52525b;
  }

  .tour-control {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .tour-button {
    border: 1px solid #a1a1aa;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    background: white;
  }

  .tour-button[data-type="next"],
  .tour-button[data-type="close"] {
    border-color: #2563eb;
    background: #2563eb;
    color: white;
  }
`
