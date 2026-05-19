export const dateInputExampleStyles = `
  [data-scope='date-input'][data-part='root'] {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
    max-width: 24rem;
  }

  .date-input-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 24rem;
  }

  .date-input-checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    user-select: none;
  }

  .date-input-checkbox {
    accent-color: var(--demo-coral-solid);
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin: 0;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.25rem;
    background: var(--demo-bg);
    cursor: pointer;
    flex-shrink: 0;
  }

  .date-input-checkbox:checked {
    border-color: var(--demo-coral-solid);
  }

  .date-input-checkbox:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--demo-coral-solid) 30%, transparent);
  }

  .date-input-clear-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: var(--demo-bg);
    color: var(--demo-neutral-fg);
    cursor: pointer;
  }

  .date-input-clear-button:hover {
    background: var(--demo-neutral-bg-subtle);
  }

  .date-input-clear-button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--demo-coral-solid) 30%, transparent);
  }

  .date-input-clear-button svg {
    width: 1rem;
    height: 1rem;
  }

  .date-input-output {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-emphasized);
  }

  [data-scope='date-input'][data-part='control'] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    flex-wrap: wrap;
  }

  [data-scope='date-input'][data-part='control'] > span {
    flex-shrink: 0;
    color: var(--demo-neutral-emphasized);
    font-size: 0.875rem;
  }

  [data-scope='date-input'][data-part='label'] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    user-select: none;
  }

  [data-scope='date-input'][data-part='label'][data-disabled] {
    opacity: 0.5;
  }

  [data-scope='date-input'][data-part='label'][data-invalid] {
    color: var(--demo-error);
  }

  [data-scope='date-input'][data-part='segment-group'] {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    height: 2.5rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    outline: none;
    cursor: text;
  }

  [data-scope='date-input'][data-part='segment-group'][data-focus] {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }

  [data-scope='date-input'][data-part='segment-group'][data-invalid] {
    border-color: var(--demo-error);
  }

  [data-scope='date-input'][data-part='segment-group'][data-invalid][data-focus] {
    box-shadow: 0 0 0 1px var(--demo-error);
  }

  [data-scope='date-input'][data-part='segment-group'][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [data-scope='date-input'][data-part='segment-group'][data-readonly] {
    background: var(--demo-neutral-bg-subtle);
  }

  [data-scope='date-input'][data-part='segment'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    min-width: 2ch;
    text-align: center;
    border-radius: 0.2rem;
    caret-color: transparent;
    outline: none;
    font-variant-numeric: tabular-nums;
    color: var(--demo-neutral-fg);
  }

  [data-scope='date-input'][data-part='segment'][data-placeholder-shown] {
    color: var(--demo-neutral-emphasized);
  }

  [data-scope='date-input'][data-part='segment']:focus {
    background: var(--demo-coral-solid);
    color: #fff;
  }

  [data-scope='date-input'][data-part='segment'][data-type='literal'] {
    padding: 0;
    user-select: none;
    min-width: unset;
    color: var(--demo-neutral-emphasized);
  }
`
