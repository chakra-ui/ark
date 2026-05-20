export const listboxExampleStyles = `
  [arkListboxRoot], [arkListboxRootProvider] {
    color: var(--demo-neutral-fg, #111827);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
    font-family: inherit;
  }

  [arkListboxRoot][data-orientation="vertical"], [arkListboxRootProvider][data-orientation="vertical"] {
    max-width: 16rem;
  }

  [arkListboxLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
    user-select: none;
  }

  [arkListboxValueText] {
    font-weight: 400;
    color: var(--demo-coral-fg, #be123c);
  }

  [arkListboxContent] {
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    background: var(--demo-bg-popover, #ffffff);
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    max-height: 18rem;
    overflow-y: auto;
    outline: none;
    scrollbar-width: thin;
    scrollbar-color: var(--demo-border-emphasized, #d1d5db) var(--demo-bg-popover, #ffffff);
  }

  [arkListboxContent]::-webkit-scrollbar {
    width: 8px;
    background: var(--demo-bg-popover, #ffffff);
    border-radius: 4px;
  }

  [arkListboxContent]::-webkit-scrollbar-thumb {
    border-radius: 0.375rem;
    background: var(--demo-border-emphasized, #d1d5db);
  }

  [arkListboxContent][data-orientation="horizontal"] {
    flex-direction: row;
    max-height: none;
    max-width: max-content;
    overflow-x: auto;
    overflow-y: hidden;
  }

  [arkListboxContent].grid-content {
    display: grid;
    grid-template-columns: repeat(var(--column-count, 5), 1fr);
    gap: 0.25rem;
    padding: 0.5rem;
    max-width: max-content;
  }

  [arkListboxEmpty] {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 1rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  [arkListboxItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-height: 2rem;
    padding-inline: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    cursor: pointer;
    user-select: none;
    outline: none;
  }

  [arkListboxItem]:hover, [arkListboxItem][data-highlighted] {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  [arkListboxItem][data-state="checked"] {
    color: var(--demo-coral-fg, #be123c);
  }

  [arkListboxItem][data-disabled] {
    filter: grayscale(100%);
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkListboxItemText] {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [arkListboxItemIndicator] {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--demo-coral-solid, #e11d48);
    flex-shrink: 0;
  }

  [arkListboxItemIndicator] svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  [arkListboxItemIndicator][data-state="unchecked"] {
    visibility: hidden;
  }

  [arkListboxItem].grid-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    font-size: 1.25rem;
    border-radius: 0.375rem;
  }

  [arkListboxItem].grid-item[data-highlighted] {
    outline: 2px solid var(--demo-coral-solid, #e11d48);
    outline-offset: -2px;
  }

  [arkListboxItem].grid-item[data-state="checked"] {
    background: var(--demo-coral-subtle, #ffe4e6);
  }

  [arkListboxItem].item-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    min-height: auto;
    padding: 0.5rem;
    border-radius: 0.375rem;
  }

  [arkListboxItem].item-card[data-state="checked"] {
    color: var(--demo-neutral-fg, #111827);
    outline: 2px solid var(--demo-coral-solid, #e11d48);
    outline-offset: -2px;
  }

  .item-card-indicator {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    background: var(--demo-coral-solid, #e11d48);
    color: white;
    border-radius: 9999px;
  }

  .item-card-indicator svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  .item-card-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  .item-card-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
  }

  .item-card-artist {
    font-size: 0.75rem;
    color: var(--demo-neutral-emphasized, #6b7280);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
  }

  .select-all-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    border: none;
    border-radius: 0.25rem;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .select-all-header-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid transparent;
    background: var(--demo-coral-solid, #e11d48);
    color: white;
    border-radius: 0.25rem;
  }

  .select-all-header-indicator svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .select-all-header-indicator:empty {
    background: transparent;
    border-color: var(--demo-border-emphasized, #d1d5db);
  }

  .select-all-header-label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #111827);
    user-select: none;
  }

  [arkListboxItemGroup] {
    display: flex;
    flex-direction: column;
  }

  [arkListboxItemGroup] + [arkListboxItemGroup] {
    margin-top: 0.5rem;
  }

  [arkListboxItemGroupLabel] {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    align-self: flex-start;
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding-inline: 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    white-space: nowrap;
    user-select: none;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    background: var(--demo-bg-popover, #ffffff);
    color: var(--demo-neutral-fg, #111827);
    cursor: pointer;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .button svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  .button:has(> svg:only-child) {
    padding-inline: 0.625rem !important;
  }

  .button:is(:hover, [aria-expanded="true"]):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f3f4f6);
  }

  .button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #fb7185);
    outline-offset: -1px;
  }

  .button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
    cursor: not-allowed;
  }

  input[arkListboxInput] {
    width: 100%;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg, #111827);
    background: transparent;
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  input[arkListboxInput]::placeholder {
    color: var(--demo-neutral-emphasized, #6b7280);
  }

  input[arkListboxInput]:focus {
    border-color: var(--demo-coral-solid, #e11d48);
    box-shadow: 0 0 0 1px var(--demo-coral-solid, #e11d48);
  }
`
