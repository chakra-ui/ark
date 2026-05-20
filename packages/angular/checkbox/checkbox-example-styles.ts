export const checkboxExampleStyles = `
  [arkCheckbox],
  [arkCheckboxRootProvider] {
    color: var(--demo-neutral-fg);
    display: inline-flex;
    align-items: center;
    vertical-align: top;
    gap: 0.5rem;
    position: relative;
  }

  [arkCheckbox][data-disabled],
  [arkCheckboxRootProvider][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkCheckboxLabel] {
    font-size: 1rem;
    line-height: 1.25rem;
    user-select: none;
    color: var(--demo-neutral-fg);
  }

  [arkCheckboxControl] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.25rem;
    background: transparent;
    color: var(--demo-coral-contrast);
  }

  [arkCheckboxControl][data-state='checked'],
  [arkCheckboxControl][data-state='indeterminate'] {
    background: var(--demo-coral-solid);
    border-color: var(--demo-coral-solid);
  }

  [arkCheckboxControl][data-focus-visible] {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  [arkCheckboxControl][data-invalid] {
    border-color: var(--demo-error);
  }

  [arkCheckboxControl][data-invalid][data-focus-visible] {
    border-color: var(--demo-error);
    box-shadow: 0 0 0 1px var(--demo-error);
  }

  [arkCheckboxControl] svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  [arkCheckboxIndicator] {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  [arkCheckboxGroup],
  [arkCheckboxGroupProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .checkbox-demo-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding-inline: 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
    white-space: nowrap;
    user-select: none;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .checkbox-demo-button:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .checkbox-demo-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .checkbox-demo-button:disabled,
  .checkbox-demo-button[data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .checkbox-demo-button[data-variant='solid'] {
    color: var(--demo-coral-contrast);
    background: var(--demo-coral-solid);
    border-color: var(--demo-coral-solid);
  }

  .checkbox-demo-button[data-variant='solid']:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-coral-fg);
    border-color: var(--demo-coral-fg);
  }

  .checkbox-demo-button[data-variant='solid']:focus-visible {
    outline-offset: 2px;
  }
`
