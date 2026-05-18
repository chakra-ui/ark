export const popoverExampleStyles = `
  [arkPopoverTrigger] {
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

  [arkPopoverTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkPopoverPositioner] {
    z-index: 50;
  }

  [arkPopoverContent] {
    position: relative;
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    width: 100%;
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  [arkPopoverTitle] {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
  }

  [arkPopoverDescription] {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--demo-neutral-muted, #57534e);
  }

  [arkPopoverCloseTrigger] {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
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

  [arkPopoverArrow] {
    --arrow-size: 8px;
    --arrow-background: var(--demo-bg, #ffffff);
  }
`
