export const floatingPanelExampleStyles = `
  [arkFloatingPanelTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    border: 1px solid var(--demo-border);
    color: var(--demo-neutral-fg);
    background: transparent;
    cursor: pointer;
  }

  [arkFloatingPanelTrigger]:hover {
    background-color: var(--demo-neutral-subtle);
  }

  [arkFloatingPanelTrigger]:focus-visible,
  [arkFloatingPanelCloseTrigger]:focus-visible,
  [arkFloatingPanelStageTrigger]:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }

  [arkFloatingPanelPositioner] {
    z-index: var(--demo-popover-z-index);
  }

  [arkFloatingPanelContent] {
    display: flex;
    flex-direction: column;
    width: 100%;
    outline: none;
    border: 1px solid var(--demo-border);
    border-radius: 0.5rem;
    background-color: var(--demo-bg-popover);
    color: var(--demo-neutral-fg);
    box-shadow: var(--demo-shadow-lg);
  }

  [arkFloatingPanelContent][data-topmost] {
    z-index: 999999;
  }

  [arkFloatingPanelContent][data-behind] {
    opacity: 0.4;
  }

  [arkFloatingPanelHeader] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 0.5rem;
    padding-inline: 1rem;
    border-bottom: 1px solid var(--demo-border);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    background-color: var(--demo-neutral-subtle);
    cursor: grab;
  }

  [arkFloatingPanelHeader]:active {
    cursor: grabbing;
  }

  [arkFloatingPanelTitle] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    color: var(--demo-neutral-fg);
    font-size: 0.875rem;
    font-weight: 500;
  }

  [arkFloatingPanelTitle] [aria-hidden='true'] {
    color: var(--demo-neutral-solid);
    line-height: 1;
  }

  [arkFloatingPanelBody] {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    padding: 1rem;
    color: var(--demo-neutral-fg);
    font-size: 0.875rem;
  }

  [arkFloatingPanelControl] {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  [arkFloatingPanelStageTrigger],
  [arkFloatingPanelCloseTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 1px solid var(--demo-border);
    border-radius: 0.25rem;
    background-color: var(--demo-bg-popover);
    color: var(--demo-neutral-fg);
    cursor: pointer;
  }

  [arkFloatingPanelStageTrigger]:hover,
  [arkFloatingPanelCloseTrigger]:hover {
    background-color: var(--demo-neutral-subtle);
  }

  [arkFloatingPanelResizeTrigger][data-axis='n'],
  [arkFloatingPanelResizeTrigger][data-axis='s'] {
    height: 6px;
    max-width: 90%;
  }

  [arkFloatingPanelResizeTrigger][data-axis='e'],
  [arkFloatingPanelResizeTrigger][data-axis='w'] {
    width: 6px;
    max-height: 90%;
  }

  [arkFloatingPanelResizeTrigger][data-axis='ne'],
  [arkFloatingPanelResizeTrigger][data-axis='nw'],
  [arkFloatingPanelResizeTrigger][data-axis='se'],
  [arkFloatingPanelResizeTrigger][data-axis='sw'] {
    width: 10px;
    height: 10px;
  }
`
