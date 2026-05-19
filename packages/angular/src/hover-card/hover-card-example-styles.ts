export const hoverCardExampleStyles = `
  [arkHoverCardTrigger] {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-family: inherit;
    color: var(--demo-coral-fg, #c7553f);
    text-decoration: underline;
    text-decoration-color: var(--demo-coral-muted, #e7a08f);
    text-underline-offset: 2px;
    cursor: pointer;
    font-weight: 500;
    transition:
      text-decoration-color 150ms,
      color 150ms;
  }

  [arkHoverCardTrigger]:hover {
    text-decoration-color: var(--demo-coral-fg, #c7553f);
  }

  [arkHoverCardTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
    border-radius: 2px;
  }

  [arkHoverCardPositioner] {
    z-index: 50;
  }

  [arkHoverCardContent] {
    --arrow-background: var(--demo-bg-popover, #ffffff);
    --arrow-size: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--demo-bg-popover, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border: 1px solid var(--demo-border, #e7e5e4);
    border-radius: 12px;
    box-shadow: var(--demo-shadow-lg, 0 16px 40px rgba(0, 0, 0, 0.16));
    padding: 1rem;
    width: 300px;
    outline: none;
    z-index: calc(var(--demo-popover-z-index, 1000) + var(--layer-index, 0));
    transform-origin: var(--transform-origin);
  }

  [arkHoverCardContent][data-state='open'] {
    animation: hover-card-scale-fade-in 0.15s ease-out;
  }

  [arkHoverCardContent][data-state='closed'] {
    animation: hover-card-scale-fade-out 0.1s ease-in;
  }

  [arkHoverCardArrow] {
    --arrow-background: var(--demo-bg-popover, #ffffff);
    --arrow-shadow-color: var(--demo-border, #e7e5e4);
  }

  [arkHoverCardArrowTip] {
    border-top: 1px solid var(--demo-border, #e7e5e4);
    border-left: 1px solid var(--demo-border, #e7e5e4);
  }

  .Avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
  }

  .AvatarFallback {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--demo-coral-subtle, #fff1ed);
    color: var(--demo-coral-fg, #c7553f);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.25rem;
  }

  .Header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .Body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .Name {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.25;
    color: var(--demo-neutral-fg, #1c1917);
  }

  .Username {
    margin: 0;
    font-size: 14px;
    color: var(--demo-neutral-emphasized, #57534e);
  }

  .Bio {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    color: var(--demo-neutral-fg, #1c1917);
  }

  .Stats {
    display: flex;
    gap: 1rem;
    font-size: 14px;
  }

  .Stat {
    display: flex;
    gap: 0.25rem;
  }

  .StatValue {
    font-weight: 700;
    color: var(--demo-neutral-fg, #1c1917);
  }

  .StatLabel {
    color: var(--demo-neutral-emphasized, #57534e);
  }

  .FollowButton {
    padding: 0.5rem 1rem;
    font-size: 14px;
    font-weight: 600;
    border-radius: 9999px;
    border: none;
    background: var(--demo-neutral-fg, #1c1917);
    color: var(--demo-neutral-contrast, #ffffff);
    cursor: pointer;
    transition: opacity 150ms;
  }

  .FollowButton:hover {
    opacity: 0.9;
  }

  .Paragraph {
    font-size: 0.875rem;
    line-height: 1.75;
    color: var(--demo-neutral-fg, #1c1917);
    max-width: 32rem;
  }

  @keyframes hover-card-scale-fade-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes hover-card-scale-fade-out {
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
