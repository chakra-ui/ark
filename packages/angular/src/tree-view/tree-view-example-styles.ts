export const treeViewExampleStyles = `
  :host {
    display: grid;
    gap: 0.75rem;
    width: min(100%, 24rem);
    color: var(--demo-neutral-fg, #1c1917);
    font-family: system-ui, sans-serif;
  }

  [arkTreeViewLabel] {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--demo-neutral-muted, #57534e);
  }

  [arkTreeViewTree] {
    display: grid;
    gap: 0.125rem;
    min-width: 18rem;
    padding: 0.25rem;
    border: 1px solid var(--demo-neutral-line, #d6d3d1);
    border-radius: 0.5rem;
    background: var(--demo-bg, #ffffff);
  }

  [arkTreeViewBranchControl],
  [arkTreeViewItem] {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    min-height: 2rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    cursor: default;
    user-select: none;
  }

  [arkTreeViewBranchControl][data-focus],
  [arkTreeViewItem][data-focus] {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 1px;
  }

  [arkTreeViewBranchControl][data-selected],
  [arkTreeViewItem][data-selected] {
    background: var(--demo-coral-3, #fde6df);
    color: var(--demo-coral-11, #8a2d1a);
  }

  [arkTreeViewBranchIndicator] {
    display: inline-grid;
    place-items: center;
    width: 1rem;
    height: 1rem;
    color: var(--demo-neutral-muted, #78716c);
    transition: transform 120ms ease;
  }

  [arkTreeViewBranchIndicator][data-state='open'] {
    transform: rotate(90deg);
  }

  [arkTreeViewBranchText],
  [arkTreeViewItemText] {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    min-width: 0;
    font-size: 0.875rem;
  }

  [arkTreeViewBranchContent] {
    display: grid;
    gap: 0.125rem;
    margin-inline-start: 1.25rem;
    position: relative;
  }

  [arkTreeViewBranchIndentGuide] {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0.375rem;
    width: 1px;
    background: var(--demo-neutral-line, #e7e5e4);
  }

  [arkTreeViewNodeCheckbox] {
    display: inline-grid;
    place-items: center;
    width: 1rem;
    height: 1rem;
    border: 1px solid var(--demo-neutral-line, #a8a29e);
    border-radius: 0.25rem;
    background: var(--demo-bg, #ffffff);
  }

  [arkTreeViewNodeCheckbox][data-state='checked'],
  [arkTreeViewNodeCheckbox][data-state='indeterminate'] {
    background: var(--demo-coral-9, #c7553f);
    border-color: var(--demo-coral-9, #c7553f);
    color: white;
  }

  [arkTreeViewNodeRenameInput] {
    width: 12rem;
    padding: 0.25rem 0.375rem;
    border: 1px solid var(--demo-coral-7, #f3a28c);
    border-radius: 0.25rem;
    font: inherit;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2rem;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--demo-neutral-line, #d6d3d1);
    border-radius: 0.375rem;
    background: var(--demo-bg, #ffffff);
    color: inherit;
    font: inherit;
    font-size: 0.8125rem;
  }

  output {
    font-size: 0.8125rem;
    color: var(--demo-neutral-muted, #57534e);
  }

  .icon {
    width: 1rem;
    height: 1rem;
    flex: 0 0 auto;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }

  .loader {
    animation: tree-view-spin 900ms linear infinite;
  }

  @keyframes tree-view-spin {
    to {
      transform: rotate(360deg);
    }
  }
`
