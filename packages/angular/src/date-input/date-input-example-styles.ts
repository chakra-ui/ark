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

  [data-scope='date-picker'][data-part='root'] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
    max-width: 24rem;
  }

  [data-scope='date-picker'][data-part='control'] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  [data-scope='date-picker'][data-part='trigger'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    font-size: 0.875rem;
    font-family: inherit;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
    outline: none;
    flex-shrink: 0;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;
  }

  [data-scope='date-picker'][data-part='trigger'] svg {
    width: 1rem;
    height: 1rem;
  }

  [data-scope='date-picker'][data-part='trigger']:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  [data-scope='date-picker'][data-part='trigger']:focus-visible {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }

  [data-scope='date-picker'][data-part='trigger'][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [data-scope='date-picker'][data-part='content'] {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    min-width: 17.5rem;
    background: var(--demo-bg-popover);
    border: 1px solid var(--demo-border);
    border-radius: 0.5rem;
    box-shadow: var(--demo-shadow-md);
    z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0));
    outline: none;
  }

  [data-scope='date-picker'][data-part='content'][data-state='open'] {
    animation: datepicker-fade-in 0.15s ease-out;
  }

  [data-scope='date-picker'][data-part='content'][data-state='closed'] {
    animation: datepicker-fade-out 0.1s ease-in;
  }

  [data-scope='date-picker'][data-part='view'] {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  [data-scope='date-picker'][data-part='view'][hidden] {
    display: none;
  }

  [data-scope='date-picker'][data-part='view-control'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  [data-scope='date-picker'][data-part='view-trigger'] {
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: inherit;
    background: transparent;
    border: none;
    border-radius: 0.25rem;
    color: var(--demo-neutral-fg);
    outline: none;
    transition: background 0.15s ease;
  }

  [data-scope='date-picker'][data-part='view-trigger']:hover {
    background: var(--demo-neutral-subtle);
  }

  [data-scope='date-picker'][data-part='view-trigger']:focus-visible {
    background: var(--demo-neutral-subtle);
    box-shadow: 0 0 0 2px var(--demo-coral-focus-ring);
  }

  [data-scope='date-picker'][data-part='prev-trigger'],
  [data-scope='date-picker'][data-part='next-trigger'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
    outline: none;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;
  }

  [data-scope='date-picker'][data-part='prev-trigger'] svg,
  [data-scope='date-picker'][data-part='next-trigger'] svg {
    width: 1rem;
    height: 1rem;
  }

  [data-scope='date-picker'][data-part='prev-trigger']:hover:not(:disabled, [data-disabled]),
  [data-scope='date-picker'][data-part='next-trigger']:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  [data-scope='date-picker'][data-part='prev-trigger']:focus-visible,
  [data-scope='date-picker'][data-part='next-trigger']:focus-visible {
    background: var(--demo-neutral-subtle);
    box-shadow: 0 0 0 2px var(--demo-coral-focus-ring);
  }

  [data-scope='date-picker'][data-part='prev-trigger'][data-disabled],
  [data-scope='date-picker'][data-part='next-trigger'][data-disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  [data-scope='date-picker'][data-part='range-text'] {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--demo-neutral-fg);
  }

  [data-scope='date-picker'][data-part='table'] {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  [data-scope='date-picker'][data-part='table-header'] {
    padding: 0.5rem 0;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--demo-neutral-emphasized);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  [data-scope='date-picker'][data-part='table-cell'] {
    padding: 0;
    text-align: center;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2.25rem;
    padding: 0;
    font-size: 0.8125rem;
    font-weight: 400;
    font-family: inherit;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
    outline: none;
    user-select: none;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger']:hover:not(
      :disabled,
      [data-disabled],
      [data-selected],
      [data-in-range]
    ) {
    background: var(--demo-neutral-subtle);
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-view='day'] {
    width: 2.5rem;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger']:is(:focus-visible, [data-focus]) {
    outline: 2px solid var(--demo-coral-solid);
    outline-offset: -2px;
    position: relative;
    z-index: 1;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-today] {
    font-weight: 600;
    color: var(--demo-coral-fg);
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-selected] {
    background: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
    font-weight: 500;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-in-range] {
    background: var(--demo-coral-subtle);
    color: var(--demo-coral-fg);
    border-radius: 0;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-range-start] {
    background: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
    border-radius: 0;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-range-end] {
    background: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
    border-radius: 0;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-range-start][data-range-end] {
    border-radius: 0.375rem;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-outside-range] {
    color: var(--demo-neutral-emphasized);
    opacity: 0.5;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-disabled] {
    color: var(--demo-neutral-emphasized);
    opacity: 0.4;
    cursor: not-allowed;
  }

  [data-scope='date-picker'][data-part='table-cell-trigger'][data-unavailable] {
    color: var(--demo-neutral-emphasized);
    text-decoration: line-through;
    opacity: 0.4;
    cursor: not-allowed;
  }

  @keyframes datepicker-fade-in {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes datepicker-fade-out {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-4px);
    }
  }
`
