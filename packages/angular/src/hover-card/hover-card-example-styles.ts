export const hoverCardExampleStyles = `
  [arkHoverCardTrigger] {
    display: inline-flex;
    align-items: center;
    font-family: inherit;
    color: var(--demo-accent, #c7553f);
    text-decoration: underline;
    cursor: pointer;
  }

  [arkHoverCardTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkHoverCardPositioner] {
    z-index: 50;
  }

  [arkHoverCardContent] {
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

  [arkHoverCardArrow] {
    --arrow-size: 8px;
    --arrow-background: var(--demo-bg, #ffffff);
  }
`
