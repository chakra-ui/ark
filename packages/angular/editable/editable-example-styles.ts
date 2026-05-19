export const editableExampleStyles = `
  [arkEditableRoot], [arkEditableRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
    max-width: 24rem;
    font-family: inherit;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkEditableRoot][data-disabled],
  [arkEditableRootProvider][data-disabled] {
    opacity: 0.5;
  }

  [arkEditableLabel] {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkEditableArea] {
    display: flex;
    align-items: flex-start;
    position: relative;
  }

  [arkEditableInput],
  [arkEditablePreview] {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkEditableInput] {
    background: var(--demo-bg-popover, #ffffff);
    border-color: var(--demo-border-emphasized, #d1d5db);
    outline: none;
  }

  [arkEditablePreview] {
    background: transparent;
    cursor: text;
  }

  [arkEditablePreview]:hover {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  [arkEditablePreview][data-placeholder] {
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  [arkEditableInput]:focus-visible,
  [arkEditableEditTrigger]:focus-visible,
  [arkEditableSubmitTrigger]:focus-visible,
  [arkEditableCancelTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #f97316);
    outline-offset: 2px;
  }

  [arkEditableControl] {
    display: flex;
    gap: 0.5rem;
    padding-top: 0.25rem;
  }

  [arkEditableEditTrigger],
  [arkEditableSubmitTrigger],
  [arkEditableCancelTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 0.875rem;
    font-family: inherit;
    line-height: 1;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg, #111827);
    cursor: pointer;
  }

  [arkEditableEditTrigger]:hover,
  [arkEditableSubmitTrigger]:hover,
  [arkEditableCancelTrigger]:hover {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  [arkEditableSubmitTrigger] {
    background: var(--demo-coral-solid, #ea580c);
    border-color: var(--demo-coral-solid, #ea580c);
    color: var(--demo-coral-contrast, #ffffff);
  }

  [arkEditableSubmitTrigger]:hover {
    background: var(--demo-coral-emphasized, #c2410c);
  }

  .textarea {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    min-height: 5rem;
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.5;
    font-family: inherit;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg, #111827);
    resize: vertical;
    white-space: pre-wrap;
  }

  textarea.textarea {
    background: var(--demo-bg-popover, #ffffff);
    border-color: var(--demo-border-emphasized, #d1d5db);
    outline: none;
  }

  span.textarea {
    display: block;
    background: transparent;
    cursor: text;
  }

  span.textarea:hover {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  span.textarea[data-placeholder] {
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  .helper-text {
    font-size: 0.75rem;
    color: var(--demo-neutral-fg-muted, #6b7280);
  }
`
