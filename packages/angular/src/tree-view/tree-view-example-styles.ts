export const treeViewExampleStyles = `
  :host {
    color: var(--demo-neutral-fg, #1c1917);
    --tree-item-gap: 0.5rem;
    --tree-indentation: 1rem;
    --tree-padding-inline: 0.75rem;
    --tree-padding-block: 0.375rem;
    --tree-icon-size: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 20rem;
  }

  [arkTreeViewLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #1c1917);
    user-select: none;
  }

  [arkTreeViewTree] {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  [arkTreeViewTree] ::ng-deep svg,
  ::ng-deep .icon {
    width: var(--tree-icon-size);
    height: var(--tree-icon-size);
    flex-shrink: 0;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }

  [arkTreeViewBranch] {
    position: relative;
  }

  [arkTreeViewBranchControl],
  [arkTreeViewItem] {
    display: flex;
    align-items: center;
    gap: var(--tree-item-gap);
    border-radius: 0.375rem;
    user-select: none;
    position: relative;
    cursor: pointer;
    width: 100%;
    border: none;
    background: transparent;
    font: inherit;
    color: var(--demo-neutral-fg, #1c1917);
    text-align: start;
    text-decoration: none;

    --tree-depth: calc(var(--depth) - 1);
    --tree-indentation-offset: calc(var(--tree-indentation) * var(--tree-depth));
    --tree-icon-offset: calc(var(--tree-icon-size) * var(--tree-depth) * 0.5);
    --tree-offset: calc(var(--tree-padding-inline) + var(--tree-indentation-offset) + var(--tree-icon-offset));

    padding-inline-start: var(--tree-offset);
    padding-inline-end: var(--tree-padding-inline);
    padding-block: var(--tree-padding-block);
  }

  [arkTreeViewBranchControl]:hover,
  [arkTreeViewItem]:hover {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  [arkTreeViewBranchControl]:focus-visible,
  [arkTreeViewItem]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -2px;
  }

  [arkTreeViewBranchControl][data-selected],
  [arkTreeViewItem][data-selected] {
    background: var(--demo-neutral-subtle, #f5f5f4);
    color: var(--demo-coral-fg, #9f3a24);
  }

  [arkTreeViewBranchControl][data-disabled],
  [arkTreeViewItem][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
    cursor: not-allowed;
  }

  [arkTreeViewBranchContent] {
    position: relative;
  }

  [arkTreeViewBranchContent][data-state='open'] {
    animation:
      expand-height 150ms ease-out,
      fade-in 150ms ease-out;
  }

  [arkTreeViewBranchContent][data-state='closed'] {
    animation:
      collapse-height 150ms ease-out,
      fade-out 150ms ease-out;
  }

  [data-animate='false'] [arkTreeViewBranchContent][data-state] {
    animation: none;
  }

  [arkTreeViewBranchIndentGuide] {
    height: 100%;
    width: 1px;
    background: var(--demo-border, #e7e5e4);
    position: absolute;
    z-index: 1;

    --tree-depth: calc(var(--depth) - 1);
    --tree-indentation-offset: calc(var(--tree-indentation) * var(--tree-depth));
    --tree-offset: calc(var(--tree-padding-inline) + var(--tree-indentation-offset));
    --tree-icon-offset: calc(var(--tree-icon-size) * 0.5 * var(--depth));

    inset-inline-start: calc(var(--tree-offset) + var(--tree-icon-offset));
  }

  [arkTreeViewBranchIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--demo-neutral-emphasized, #44403c);
    transform-origin: center;
    transition: transform 150ms ease;
  }

  [arkTreeViewBranchIndicator][data-state='open'] {
    transform: rotate(90deg);
  }

  [arkTreeViewBranchIndicator] ::ng-deep svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  [arkTreeViewBranchTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  [arkTreeViewBranchText],
  [arkTreeViewItemText] {
    flex: 1;
    display: inline-flex;
    align-items: center;
    gap: var(--tree-item-gap);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [arkTreeViewItemIndicator] {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--demo-coral-solid, #c7553f);
    flex-shrink: 0;
  }

  [arkTreeViewItemIndicator] ::ng-deep svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  [arkTreeViewNodeCheckbox] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    border: 1px solid var(--demo-border-emphasized, #a8a29e);
    border-radius: 0.25rem;
    background: var(--demo-bg-checkbox, #ffffff);
    color: var(--demo-coral-contrast, #ffffff);
    cursor: pointer;
  }

  [arkTreeViewNodeCheckbox][data-state='checked'],
  [arkTreeViewNodeCheckbox][data-state='indeterminate'] {
    background: var(--demo-coral-solid, #c7553f);
    border-color: var(--demo-coral-solid, #c7553f);
  }

  [arkTreeViewNodeCheckbox]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkTreeViewNodeCheckbox] ::ng-deep svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  [arkTreeViewNodeCheckboxIndicator] {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-group {
    display: flex;
    gap: 0.25rem;
    flex-shrink: 0;
    opacity: 0;
  }

  :where([arkTreeViewBranchControl], [arkTreeViewItem]):hover .action-group,
  :where([arkTreeViewBranchControl], [arkTreeViewItem]):focus-within .action-group {
    opacity: 1;
  }

  .action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    border: none;
    border-radius: 0.25rem;
    background: transparent;
    color: var(--demo-neutral-fg, #1c1917);
    cursor: pointer;
    flex-shrink: 0;
  }

  .action ::ng-deep svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  [arkTreeViewNodeRenameInput] {
    flex: 1;
    min-width: 0;
    height: 1.25rem;
    padding-inline: 0.25rem;
    padding-block: 0;
    margin-block: -1px;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid var(--demo-coral-solid, #c7553f);
    border-radius: 0.25rem;
    background: var(--demo-bg-popover, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    outline: none;
    box-sizing: content-box;
  }

  [arkTreeViewNodeRenameInput]:focus {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  .filter-input {
    width: 100%;
    min-height: 2.25rem;
    padding: 0.375rem 0.625rem;
    border: 1px solid var(--demo-border, #d6d3d1);
    border-radius: 0.375rem;
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    font: inherit;
    font-size: 0.875rem;
  }

  .filter-input:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 1px;
  }

  ::ng-deep .loader {
    animation: spin 1s infinite;
  }

  @keyframes expand-height {
    from {
      height: 0;
    }
    to {
      height: var(--height);
    }
  }

  @keyframes collapse-height {
    from {
      height: var(--height);
    }
    to {
      height: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
