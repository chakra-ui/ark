export const menuExampleStyles = `
  [arkMenuTrigger] {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    background: var(--demo-coral-9, #c7553f);
    color: white;
    border: 1px solid transparent;
    cursor: pointer;
  }

  [arkMenuContextTrigger] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15rem;
    height: 12rem;
    font-size: 0.875rem;
    border: 1px dashed var(--demo-border-emphasized, #a8a29e);
    border-radius: 0.375rem;
    user-select: none;
  }

  [arkMenuTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkMenuPositioner] {
    z-index: 50;
  }

  [arkMenuContent] {
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 0.25rem;
    min-width: 12rem;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  [arkMenuItem] {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.5rem;
    font-size: 0.8125rem;
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
  }

  [arkMenuItem],
  [arkMenuCheckboxItem],
  [arkMenuRadioItem],
  [arkMenuTriggerItem] {
    color: var(--demo-neutral-fg, #1c1917);
    outline: none;
  }

  [arkMenuItem][data-highlighted] {
    background: var(--demo-coral-3, #fde6df);
    color: var(--demo-coral-11, #8a2d1a);
  }

  [arkMenuItem][data-disabled] {
    color: var(--demo-neutral-muted, #a8a29e);
    cursor: not-allowed;
  }

  [arkMenuSeparator] {
    height: 1px;
    background: var(--demo-neutral-line, #e7e5e4);
    margin: 0.25rem 0;
  }

  [arkMenuArrow] {
    --arrow-size: 8px;
    --arrow-background: var(--demo-bg, #ffffff);
  }

  [arkMenuCheckboxItem],
  [arkMenuRadioItem] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.5rem;
    font-size: 0.8125rem;
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
  }

  [arkMenuCheckboxItem][data-highlighted],
  [arkMenuRadioItem][data-highlighted] {
    background: var(--demo-coral-3, #fde6df);
    color: var(--demo-coral-11, #8a2d1a);
  }

  [arkMenuItemIndicator] {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    align-items: center;
    justify-content: center;
  }

  [arkMenuItemIndicator][hidden],
  [arkMenuItemIndicator][data-state="unchecked"] {
    visibility: hidden;
  }

  [arkMenuItemGroupLabel] {
    padding: 0.25rem 0.5rem;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--demo-neutral-muted, #78716c);
  }

  [arkMenuTriggerItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.375rem 0.5rem;
    font-size: 0.8125rem;
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
  }

  [arkMenuTriggerItem]::after {
    content: '›';
    margin-left: auto;
    font-size: 1rem;
    color: var(--demo-neutral-muted, #78716c);
  }

  [arkMenuTriggerItem][data-highlighted] {
    background: var(--demo-coral-3, #fde6df);
    color: var(--demo-coral-11, #8a2d1a);
  }

  .message-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
    max-width: 24rem;
  }

  .message-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--demo-neutral-line, #e7e5e4);
    border-radius: 0.375rem;
  }

  .message-content {
    flex: 1;
    min-width: 0;
  }

  .message-sender {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--demo-neutral-fg, #1c1917);
  }

  .message-preview {
    font-size: 0.75rem;
    color: var(--demo-neutral-muted, #78716c);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .message-action[arkMenuTrigger] {
    flex-shrink: 0;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    background: transparent;
    color: var(--demo-neutral-muted, #78716c);
    border: none;
  }

  .message-action[arkMenuTrigger]:hover {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }
`
