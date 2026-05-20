export const segmentGroupExampleStyles = `
  [arkSegmentGroupRoot],
  [arkSegmentGroupRootProvider] {
    color: var(--demo-neutral-fg);
    display: inline-flex;
    align-items: center;
    position: relative;
    isolation: isolate;
    background: var(--demo-neutral-subtle);
    border-radius: 0.5rem;
    padding: 0.25rem;
    box-shadow: inset 0 0 0 1px var(--demo-border);
  }

  [arkSegmentGroupRoot][data-disabled],
  [arkSegmentGroupRootProvider][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkSegmentGroupLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    user-select: none;
  }

  [arkSegmentGroupItem] {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    padding-inline: 0.875rem;
    height: 2rem;
    border-radius: 0.375rem;
    user-select: none;
    color: var(--demo-neutral-fg);
    position: relative;
  }

  [arkSegmentGroupItem][data-orientation='vertical'] {
    width: 100%;
    justify-content: flex-start;
  }

  [arkSegmentGroupItem][data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkSegmentGroupItem][data-state='checked'] {
    color: var(--demo-coral-fg);
  }

  [arkSegmentGroupItem][data-focus-visible] {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  [arkSegmentGroupItemText] {
    position: relative;
    z-index: 1;
  }

  [arkSegmentGroupItemControl] {
    display: none;
  }

  [arkSegmentGroupIndicator] {
    position: absolute;
    z-index: 0;
    background: var(--demo-bg-popover);
    border-radius: 0.375rem;
    box-shadow: var(--demo-shadow-sm);
    width: var(--width);
    height: var(--height);
    top: var(--top);
    left: var(--left);
    transition-property: width, height, left, top;
    transition-duration: 150ms;
    transition-timing-function: ease-out;
  }

  .segment-group-toggle-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    padding-inline: 1rem;
    border-radius: 0.375rem;
    border: 1px solid var(--demo-border);
    background: var(--demo-bg-popover);
    color: var(--demo-neutral-fg);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
  }
`
