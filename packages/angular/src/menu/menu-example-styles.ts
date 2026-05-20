export const menuExampleStyles = `
  [arkMenuTrigger],
  .stack > button:not([arkMenuTrigger]),
  [arkDialogTrigger],
  .dialog-actions button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
    cursor: pointer;
  }

  [arkMenuTrigger] {
    gap: 0.25rem;
    padding-block: 0.5rem;
    min-height: auto;
    min-width: auto;
  }

  [arkMenuTrigger]:is(:hover, [data-state='open']):not(:disabled, [data-disabled]),
  .stack > button:not([arkMenuTrigger]):hover:not(:disabled, [data-disabled]),
  [arkDialogTrigger]:hover:not(:disabled, [data-disabled]),
  .dialog-actions button:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  [arkMenuTrigger]:focus-visible,
  .stack > button:not([arkMenuTrigger]):focus-visible,
  [arkDialogTrigger]:focus-visible,
  .dialog-actions button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  [arkMenuTrigger]:is(:disabled, [data-disabled]),
  .stack > button:not([arkMenuTrigger]):is(:disabled, [data-disabled]),
  [arkDialogTrigger]:is(:disabled, [data-disabled]),
  .dialog-actions button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .dialog-actions button[data-variant='solid'] {
    background: var(--demo-coral-solid);
    border-color: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
  }

  .dialog-actions button[data-variant='solid']:hover {
    background: var(--demo-coral-fg);
    border-color: var(--demo-coral-fg);
  }

  [arkMenuIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  [arkMenuIndicator] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkMenuContextTrigger] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15rem;
    height: 12rem;
    font-size: 0.875rem;
    border: 1px dashed var(--demo-border-emphasized);
    border-radius: 0.375rem;
    user-select: none;
  }

  [arkMenuContent] {
    --arrow-size: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    min-width: max(var(--reference-width), 10rem);
    max-height: min(var(--available-height, 300px), 300px);
    background: var(--demo-bg-popover);
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    box-shadow: var(--demo-shadow-md);
    z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0));
    outline: none;
    transform-origin: var(--transform-origin);
  }

  [arkMenuContent][data-state='open'] {
    animation: menu-scale-fade-in 0.15s ease-out;
  }

  [arkMenuContent][data-state='closed'] {
    animation: menu-scale-fade-out 0.1s ease-in;
  }

  [arkMenuArrow] {
    --arrow-background: var(--demo-bg-popover);
    --arrow-shadow-color: var(--demo-border-emphasized);
    z-index: -1;
  }

  [arkMenuArrowTip] {
    border-top: 1px solid var(--demo-border-emphasized);
    border-left: 1px solid var(--demo-border-emphasized);
  }

  [arkMenuItemGroup],
  [arkMenuRadioItemGroup] {
    display: flex;
    flex-direction: column;
  }

  [arkMenuItemGroup] + [arkMenuItemGroup] {
    margin-top: 0.5rem;
  }

  [arkMenuItemGroupLabel] {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--demo-neutral-emphasized);
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  [arkMenuItem] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2rem;
    padding-inline: 0.725rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.25rem;
    user-select: none;
    outline: none;
    color: var(--demo-neutral-fg);
    text-decoration: none;
    cursor: pointer;
  }

  [arkMenuItem][data-highlighted] {
    background: var(--demo-neutral-subtle);
  }

  [arkMenuItem][data-disabled] {
    color: var(--demo-neutral-emphasized);
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkMenuTriggerItem] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.25rem;
    user-select: none;
    outline: none;
    cursor: pointer;
  }

  [arkMenuTriggerItem][data-highlighted] {
    background: var(--demo-neutral-subtle);
  }

  [arkMenuTriggerItem]::after {
    content: '›';
    font-size: 1rem;
    color: var(--demo-neutral-emphasized);
  }

  [arkMenuCheckboxItem],
  [arkMenuRadioItem] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.25rem;
    user-select: none;
    outline: none;
    cursor: pointer;
  }

  [arkMenuCheckboxItem][data-highlighted],
  [arkMenuRadioItem][data-highlighted] {
    background: var(--demo-neutral-subtle);
  }

  [arkMenuCheckboxItem][data-state='checked'],
  [arkMenuRadioItem][data-state='checked'] {
    color: var(--demo-coral-fg);
  }

  [arkMenuCheckboxItem][data-disabled],
  [arkMenuRadioItem][data-disabled] {
    color: var(--demo-neutral-emphasized);
    opacity: 0.5;
  }

  [arkMenuItemText] {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [arkMenuItemIndicator] {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--demo-coral-solid);
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }

  [arkMenuItemIndicator] svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  [arkMenuItemIndicator][hidden],
  [arkMenuItemIndicator][data-state='unchecked'] {
    visibility: hidden;
  }

  [arkMenuSeparator] {
    height: 1px;
    margin-block: 0.25rem;
    border: 0;
    background: var(--demo-border);
  }

  [arkDialogBackdrop] {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0));
  }

  [arkDialogBackdrop][data-state='open'] {
    animation: menu-fade-in 0.15s ease-out;
  }

  [arkDialogBackdrop][data-state='closed'] {
    animation: menu-fade-out 0.1s ease-in;
  }

  [arkDialogPositioner] {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    inset: 0;
    z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0));
    overscroll-behavior-y: none;
    scrollbar-gutter: stable both-edges;
  }

  [arkDialogContent] {
    --px: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 24rem;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);
    padding: var(--px);
    border-radius: 8px;
    border: 1px solid var(--demo-border);
    background: var(--demo-bg-popover);
    box-shadow: var(--demo-shadow-xl);
    z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0));
    outline: 0;
    transition: transform 0.1s ease-in-out;
    translate: calc(-1 * var(--scrollbar-width, 0px) / 2) 0;
  }

  [arkDialogContent][data-has-nested] {
    transform: scale(calc(1 - var(--nested-layer-count) * 0.05));
  }

  [arkDialogContent][data-state='open'] {
    animation: menu-scale-fade-in 0.15s ease-out;
  }

  [arkDialogContent][data-state='closed'] {
    animation: menu-scale-fade-out 0.1s ease-in;
  }

  [arkDialogTitle] {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
    color: var(--demo-neutral-fg);
  }

  [arkDialogDescription] {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--demo-neutral-fg-muted);
  }

  .dialog-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  [arkDialogCloseTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--demo-neutral-emphasized);
    transition: background-color 0.15s ease;
    cursor: pointer;
  }

  [arkDialogCloseTrigger] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkDialogCloseTrigger]:hover {
    background: var(--demo-neutral-muted);
  }

  [arkDialogCloseTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.5rem;
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
    border: 1px solid var(--demo-border);
    border-radius: 0.375rem;
  }

  .message-content {
    flex: 1;
    min-width: 0;
  }

  .message-sender {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--demo-neutral-fg);
  }

  .message-preview {
    font-size: 0.75rem;
    color: var(--demo-neutral-emphasized);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .message-action[arkMenuTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.75rem;
    height: 1.75rem;
    min-width: auto;
    min-height: auto;
    padding: 0;
    border: none;
    border-radius: 0.25rem;
    background: transparent;
    color: var(--demo-neutral-emphasized);
    cursor: pointer;
    transition: background 150ms;
  }

  .message-action[arkMenuTrigger] svg {
    width: 1rem;
    height: 1rem;
  }

  .message-action[arkMenuTrigger]:hover {
    background: var(--demo-neutral-subtle);
  }

  @keyframes menu-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes menu-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes menu-scale-fade-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes menu-scale-fade-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.96);
    }
  }
`
