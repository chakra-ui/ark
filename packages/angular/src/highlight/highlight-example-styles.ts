export const highlightExampleStyles = `
  .Text {
    font-size: 1rem;
    line-height: 1.625;
    color: var(--demo-neutral-fg);
  }

  .Mark {
    background: var(--demo-coral-subtle);
    color: var(--demo-coral-fg);
    border-radius: 0.125rem;
    font-weight: 500;
    box-decoration-break: clone;
  }

  .Root {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 32rem;
  }

  .Label {
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized);
  }

  .Section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .Input {
    width: 100%;
    min-width: 0;
    max-width: 24rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  .Input::placeholder {
    color: var(--demo-neutral-emphasized);
  }

  .Input:focus {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }
`
