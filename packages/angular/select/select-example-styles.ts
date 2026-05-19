export const selectExampleStyles = `
  [arkSelectRoot], [arkSelectRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    font-family: inherit;
    width: 100%;
    max-width: 16rem;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkSelectLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
    user-select: none;
  }

  [arkSelectControl] {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    gap: 0.5rem;
  }

  [arkSelectTrigger] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg, #111827);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    cursor: pointer;
    outline: none;
    user-select: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  [arkSelectTrigger]:focus-visible {
    border-color: var(--demo-coral-solid, #e11d48);
    box-shadow: 0 0 0 1px var(--demo-coral-solid, #e11d48);
  }

  [arkSelectTrigger][data-placeholder-shown] {
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  [arkSelectTrigger][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkSelectTrigger][data-invalid] {
    border-color: var(--demo-error, #dc2626);
  }

  [arkSelectTrigger][data-invalid]:focus-visible {
    border-color: var(--demo-error, #dc2626);
    box-shadow: 0 0 0 1px var(--demo-error, #dc2626);
  }

  [arkSelectValueText] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select-indicators {
    position: absolute;
    top: 50%;
    right: 0.725rem;
    transform: translateY(-50%);
    display: flex;
    pointer-events: none;
    align-items: center;
    gap: 8px;
  }

  [arkSelectIndicator],
  [arkSelectClearTrigger],
  [arkSelectItemIndicator] {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  [arkSelectIndicator] {
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  [arkSelectClearTrigger] {
    color: var(--demo-neutral-emphasized, #6b7280);
    border: 0;
    background: transparent;
    transition: color 0.15s ease;
    pointer-events: auto;
    cursor: pointer;
  }

  [arkSelectClearTrigger]:hover {
    color: var(--demo-neutral-fg, #111827);
  }

  [arkSelectContent] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.25rem;
    min-width: var(--reference-width, 12rem);
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: var(--demo-bg-popover, #ffffff);
    box-shadow: var(--demo-shadow-md, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    z-index: calc(var(--demo-popover-z-index, 1000) + var(--layer-index, 0));
    max-height: min(var(--available-height, 300px), 300px);
    overflow-y: auto;
    outline: none;
    scrollbar-width: thin;
    scrollbar-color: var(--demo-border-emphasized, #d1d5db) var(--demo-bg-popover, #ffffff);
  }

  [arkSelectContent][data-state='open'] {
    animation: select-scale-fade-in 0.15s ease-out;
  }

  [arkSelectContent][data-state='closed'] {
    animation: select-scale-fade-out 0.1s ease-in;
  }

  [arkSelectItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    cursor: pointer;
    user-select: none;
  }

  [arkSelectItem][data-highlighted] {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  [arkSelectItem][data-state="checked"] {
    color: var(--demo-coral-fg, #be123c);
  }

  [arkSelectItem][data-disabled] {
    color: var(--demo-neutral-emphasized, #6b7280);
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkSelectItemText] {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [arkSelectItemIndicator] {
    color: var(--demo-coral-solid, #e11d48);
  }

  [arkSelectItemIndicator][data-state="unchecked"] {
    visibility: hidden;
  }

  [arkSelectItemGroup] {
    display: flex;
    flex-direction: column;
  }

  [arkSelectItemGroup] + [arkSelectItemGroup] {
    margin-top: 0.5rem;
  }

  [arkSelectItemGroupLabel] {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--demo-neutral-emphasized, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .select-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .select-actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .select-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: var(--demo-bg-subtle, #f9fafb);
    color: var(--demo-neutral-fg, #111827);
    padding: 0.5rem 0.75rem;
    font: inherit;
    cursor: pointer;
  }

  .select-output {
    display: block;
    color: var(--demo-neutral-emphasized, #6b7280);
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
  }

  @keyframes select-scale-fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes select-scale-fade-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`
