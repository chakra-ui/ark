export const floatingPanelExampleStyles = `
  [arkFloatingPanelTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: 0 0.875rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    background: #2563eb;
    color: #ffffff;
    font: inherit;
    font-weight: 500;
    cursor: pointer;
  }

  [arkFloatingPanelTrigger]:focus-visible,
  [arkFloatingPanelCloseTrigger]:focus-visible,
  [arkFloatingPanelStageTrigger]:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }

  [arkFloatingPanelPositioner] {
    z-index: 50;
  }

  [arkFloatingPanelContent] {
    display: flex;
    flex-direction: column;
    min-width: 16rem;
    overflow: hidden;
    border: 1px solid #d4d4d8;
    border-radius: 0.5rem;
    background: #ffffff;
    color: #18181b;
    box-shadow: 0 16px 40px rgba(24, 24, 27, 0.18);
  }

  [arkFloatingPanelHeader] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    min-height: 2.75rem;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid #e4e4e7;
  }

  [arkFloatingPanelTitle] {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
  }

  [arkFloatingPanelBody] {
    padding: 0.875rem;
    font-size: 0.875rem;
  }

  [arkFloatingPanelControl] {
    display: inline-flex;
    gap: 0.25rem;
  }

  [arkFloatingPanelStageTrigger],
  [arkFloatingPanelCloseTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    border: 0;
    border-radius: 0.25rem;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  [arkFloatingPanelStageTrigger]:hover,
  [arkFloatingPanelCloseTrigger]:hover {
    background: #f4f4f5;
  }

  [arkFloatingPanelResizeTrigger] {
    background: transparent;
  }
`
