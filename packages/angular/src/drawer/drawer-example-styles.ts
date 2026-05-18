export const drawerExampleStyles = `
  [arkDrawerTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

  [arkDrawerTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkDrawerBackdrop] {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  [arkDrawerPositioner] {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: stretch;
  }

  [arkDrawerContent] {
    position: relative;
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    box-shadow: 0 -10px 25px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    width: 100%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  [arkDrawerGrabber] {
    display: flex;
    justify-content: center;
    padding: 0.25rem 0;
    cursor: grab;
  }

  [arkDrawerGrabberIndicator] {
    display: block;
    width: 2.5rem;
    height: 0.25rem;
    border-radius: 0.125rem;
    background: var(--demo-neutral-muted, #a8a29e);
  }

  [arkDrawerTitle] {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  [arkDrawerDescription] {
    margin: 0;
    font-size: 0.875rem;
    color: var(--demo-neutral-muted, #57534e);
  }

  [arkDrawerCloseTrigger] {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    background: transparent;
    border: 0;
    border-radius: 0.25rem;
    color: inherit;
    cursor: pointer;
  }
`
