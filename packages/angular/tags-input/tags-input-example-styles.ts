export const tagsInputExampleStyles = `
  [arkTagsInputRoot], [arkTagsInputRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    font-family: inherit;
    color: var(--demo-neutral-fg, #111827);
    width: 100%;
    max-width: 32rem;
  }

  [arkTagsInputLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
    user-select: none;
  }

  [arkTagsInputLabel][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkTagsInputControl] {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
    min-height: 2.5rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: transparent;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  [arkTagsInputControl]:has([arkTagsInputClearTrigger]) {
    position: relative;
    padding-inline-end: 2rem;
  }

  [arkTagsInputControl]:focus-within {
    border-color: var(--demo-coral-solid, #e11d48);
    box-shadow: 0 0 0 1px var(--demo-coral-solid, #e11d48);
  }

  [arkTagsInputControl][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkTagsInputControl][data-invalid] {
    border-color: var(--demo-error, #dc2626);
  }

  [arkTagsInputControl][data-invalid]:focus-within {
    border-color: var(--demo-error, #dc2626);
    box-shadow: 0 0 0 1px var(--demo-error, #dc2626);
  }

  [arkTagsInputItem] {
    display: inline-flex;
    align-items: center;
    outline: none;
    cursor: default;
  }

  [arkTagsInputItemPreview] {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.25rem 0.125rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.25rem;
    background: var(--demo-neutral-subtle, #f3f4f6);
    color: var(--demo-neutral-fg, #111827);
    outline: none;
    transition: background-color 0.15s ease;
  }

  [arkTagsInputItemPreview][data-highlighted] {
    background: var(--demo-coral-subtle, #ffe4e6);
    color: var(--demo-coral-fg, #9f1239);
  }

  [arkTagsInputItemText] {
    font-weight: 500;
  }

  [arkTagsInputItemInput] {
    box-sizing: border-box;
    min-width: 4rem;
    width: auto;
    padding: 0.125rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    background: var(--demo-neutral-subtle, #f3f4f6);
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.25rem;
    color: var(--demo-neutral-fg, #111827);
    outline: none;
  }

  [arkTagsInputItemDeleteTrigger] {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    cursor: pointer;
    color: inherit;
    padding: 0.125rem;
    font-size: 0.875rem;
    line-height: 1;
    border-radius: 0.25rem;
  }

  [arkTagsInputInput] {
    flex: 1;
    box-sizing: border-box;
    min-width: 4rem;
    height: 1.75rem;
    padding: 0 0.25rem;
    border: 0;
    outline: none;
    background: transparent;
    color: var(--demo-neutral-fg, #111827);
    font-family: inherit;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  [arkTagsInputInput]::placeholder {
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  [arkTagsInputClearTrigger] {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    background: transparent;
    border: 0;
    border-radius: 0.25rem;
    color: var(--demo-neutral-emphasized, #6b7280);
    transition:
      background-color 0.15s ease,
      color 0.15s ease;
  }

  [arkTagsInputClearTrigger]:hover {
    background: var(--demo-neutral-subtle, #f3f4f6);
    color: var(--demo-neutral-fg, #111827);
  }

  .tags-input-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .tags-input-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .tags-input-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding-inline: 1rem;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg, #111827);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .tags-input-button svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  .tags-input-button:has(> svg:only-child) {
    padding-inline: 0.625rem !important;
  }

  .tags-input-button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  .tags-input-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #fb7185);
    outline-offset: -1px;
  }

  .tags-input-button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .tags-input-output {
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  [arkFieldRoot] {
    color: var(--demo-neutral-fg, #111827);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
    width: 100%;
    max-width: 24rem;
  }

  [arkFieldRoot] [arkTagsInputRoot] {
    max-width: none;
  }

  [arkFieldRoot][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldHelperText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg-muted, #4b5563);
  }

  [arkFieldErrorText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-coral-fg, #9f1239);
  }
`
