export const fieldsetExampleStyles = `
  [arkFieldsetRoot], [arkFieldsetRootProvider] {
    color: var(--demo-neutral-fg, #111827);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
    font-family: inherit;
  }

  [arkFieldsetRoot][data-disabled], [arkFieldsetRootProvider][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldsetLegend] {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
    color: var(--demo-neutral-fg, #111827);
    padding: 0;
    margin-bottom: 0.25rem;
  }

  [arkFieldsetLegend][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldsetHelperText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg-muted, #6b7280);
  }

  [arkFieldsetHelperText][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldsetErrorText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-coral-fg, #b91c1c);
  }

  [arkFieldsetErrorText][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
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

  [arkFieldRoot][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkFieldLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
  }

  [arkFieldHelperText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg-muted, #6b7280);
  }

  [arkFieldErrorText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-coral-fg, #b91c1c);
  }

  [arkFieldInput] {
    width: 100%;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg, #111827);
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  [arkFieldInput]::placeholder {
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  [arkFieldInput]:focus {
    border-color: var(--demo-coral-solid, #e11d48);
    box-shadow: 0 0 0 1px var(--demo-coral-solid, #e11d48);
  }

  [arkFieldInput][data-invalid] {
    border-color: var(--demo-coral-fg, #b91c1c);
  }

  [arkFieldInput][data-invalid]:focus {
    border-color: var(--demo-coral-fg, #b91c1c);
    box-shadow: 0 0 0 1px var(--demo-coral-fg, #b91c1c);
  }

  .phone-row {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .phone-extension {
    width: auto;
    max-width: none;
  }

  [arkSelectRoot] {
    color: var(--demo-neutral-fg, #111827);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
    max-width: 16rem;
  }

  [arkSelectControl] {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    position: relative;
  }

  [arkSelectTrigger] {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg, #111827);
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

  [arkSelectTrigger] svg,
  [arkSelectIndicator] {
    width: 1rem;
    height: 1rem;
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  [arkSelectValueText] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [arkSelectContent] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.25rem;
    min-width: var(--reference-width);
    background: var(--demo-bg-popover, white);
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    box-shadow: var(--demo-shadow-md, 0 10px 15px -3px rgb(0 0 0 / 0.1));
    z-index: calc(var(--demo-popover-z-index, 1000) + var(--layer-index, 0));
    max-height: min(var(--available-height, 300px), 300px);
    overflow-y: auto;
    outline: none;
  }

  [arkSelectItemGroup] {
    display: flex;
    flex-direction: column;
  }

  [arkSelectItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.25rem;
    user-select: none;
  }

  [arkSelectItem][data-highlighted] {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  [arkSelectItem][data-state='checked'] {
    color: var(--demo-coral-fg, #b91c1c);
  }

  [arkSelectItem][data-disabled] {
    color: var(--demo-neutral-emphasized, #6b7280);
    opacity: 0.5;
  }

  [arkSelectItemText] {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
