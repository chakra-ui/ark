export const comboboxExampleStyles = `
  [arkComboboxRoot], [arkComboboxRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    font-family: inherit;
    color: var(--demo-neutral-fg);
    width: 100%;
    max-width: 16rem;
  }

  [arkComboboxLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    user-select: none;
  }

  [arkComboboxControl] {
    position: relative;
  }

  [arkComboboxInput] {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    height: 2.5rem;
    padding: 0 0.75rem;
    padding-right: 4rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: transparent;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    color: var(--demo-neutral-fg);
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  [arkComboboxInput]::placeholder {
    color: var(--demo-neutral-emphasized);
  }

  [arkComboboxInput]:focus {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }

  [arkComboboxInput][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkComboboxInput][data-invalid] {
    border-color: var(--demo-error);
  }

  [arkComboboxInput][data-invalid]:focus {
    border-color: var(--demo-error);
    box-shadow: 0 0 0 1px var(--demo-error);
  }

  button[arkComboboxClearTrigger],
  button[arkComboboxTrigger] {
    position: absolute;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    color: var(--demo-neutral-emphasized);
    background: transparent;
    border: 0;
    transform: translateY(-50%);
    cursor: pointer;
  }

  button[arkComboboxClearTrigger]:hover,
  button[arkComboboxTrigger]:hover {
    color: var(--demo-neutral-fg);
  }

  button[arkComboboxClearTrigger] {
    right: 2rem;
  }

  button[arkComboboxTrigger] {
    right: 0.5rem;
  }

  [arkComboboxContent] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.25rem;
    min-width: var(--reference-width);
    max-height: min(var(--available-height, 300px), 300px);
    overflow-y: auto;
    overscroll-behavior: contain;
    scroll-padding-block: 0.25rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: var(--demo-bg-popover);
    box-shadow: var(--demo-shadow-md);
    outline: none;
    z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0));
    scrollbar-width: thin;
    scrollbar-color: var(--demo-border-emphasized) var(--demo-bg-popover);
  }

  [arkComboboxContent]::-webkit-scrollbar {
    width: 8px;
    background: var(--demo-bg-popover);
    border-radius: 4px;
  }

  [arkComboboxContent]::-webkit-scrollbar-thumb {
    border-radius: 0.375rem;
  }

  [arkComboboxContent][data-state='open'] {
    animation: combobox-scale-fade-in 0.15s ease-out;
  }

  [arkComboboxItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    cursor: pointer;
    outline: none;
    user-select: none;
  }

  [arkComboboxItem][data-highlighted] {
    background: var(--demo-neutral-subtle);
  }

  [arkComboboxItem][data-state="checked"] {
    color: var(--demo-coral-fg);
  }

  [arkComboboxItem][data-disabled] {
    color: var(--demo-neutral-emphasized);
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkComboboxItemText] {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [arkComboboxItemIndicator] {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--demo-coral-solid);
    flex-shrink: 0;
  }

  [arkComboboxItemIndicator][data-state="unchecked"] {
    visibility: hidden;
  }

  [arkComboboxItemGroup] {
    display: flex;
    flex-direction: column;
  }

  [arkComboboxItemGroup] + [arkComboboxItemGroup] {
    margin-top: 0.5rem;
  }

  [arkComboboxItemGroupLabel] {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: var(--demo-neutral-emphasized);
  }

  [arkComboboxEmpty] {
    padding: 0.5rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized);
  }

  .combobox-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    min-height: 1.5rem;
    align-items: center;
  }

  .combobox-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background: var(--demo-neutral-subtle);
    color: var(--demo-neutral-fg);
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 500;
  }

  .combobox-tag-placeholder {
    color: var(--demo-neutral-emphasized);
    font-size: 0.75rem;
    min-height: 24px;
    display: inline-flex;
    align-items: center;
  }

  .combobox-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized);
  }

  .combobox-spinner {
    width: 1rem;
    height: 1rem;
    animation: combobox-spin 1s linear infinite;
  }

  .combobox-item-title {
    display: block;
    font-weight: 500;
  }

  .combobox-item-subtitle {
    display: block;
    font-size: 0.75rem;
    color: var(--demo-neutral-emphasized);
  }

  [arkComboboxItem] mark {
    background: transparent;
    color: inherit;
    font-weight: 600;
    text-decoration: underline;
  }

  .combobox-field-root {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
    width: 100%;
    max-width: 24rem;
  }

  .combobox-field-helper {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg-muted);
  }

  .combobox-field-error {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--demo-coral-fg);
  }

  .combobox-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .combobox-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    width: fit-content;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    user-select: none;
    white-space: nowrap;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .combobox-button:hover {
    background: var(--demo-neutral-subtle);
  }

  .combobox-virtual-scroller {
    box-sizing: border-box;
    height: min(300px, var(--total-size));
    max-height: var(--available-height, 300px);
    overflow: auto;
    overscroll-behavior: contain;
    scroll-padding-block: 0.25rem;
    scrollbar-width: thin;
    scrollbar-color: var(--demo-border-emphasized) var(--demo-bg-popover);
  }

  .combobox-virtual-scroller::-webkit-scrollbar {
    width: 8px;
    background: var(--demo-bg-popover);
    border-radius: 4px;
  }

  .combobox-virtual-scroller::-webkit-scrollbar-thumb {
    border-radius: 0.375rem;
  }

  .combobox-virtual-spacer {
    position: relative;
    width: 100%;
  }

  .combobox-virtual-item {
    position: absolute;
    left: 0;
    width: 100%;
  }

  @keyframes combobox-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes combobox-scale-fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`
