export const marqueeExampleStyles = `
  .Root {
    color: var(--demo-neutral-fg);
    width: 100%;
    max-width: 600px;
    overflow: hidden;
  }

  .Root[data-orientation='vertical'] {
    height: 240px;
  }

  .Root[data-orientation='horizontal'] {
    height: 80px;
  }

  .Root[data-paused],
  .Root[data-paused] * {
    animation-play-state: paused !important;
  }

  .Viewport {
    width: 100%;
    height: 100%;
  }

  .Content {
    animation-timing-function: linear;
    animation-duration: var(--marquee-duration);
    animation-delay: var(--marquee-delay);
    animation-iteration-count: var(--marquee-loop-count);
  }

  .Content[data-side='start'],
  .Content[data-side='end'] {
    animation-name: marqueeX;
  }

  .Content[data-side='top'],
  .Content[data-side='bottom'] {
    animation-name: marqueeY;
  }

  .Content[data-reverse] {
    animation-direction: reverse;
  }

  @media (prefers-reduced-motion: reduce) {
    .Content {
      animation: none !important;
    }
  }

  .Edge {
    z-index: 10;
    pointer-events: none;
  }

  .Edge[data-side='start'] {
    width: 20%;
    background: linear-gradient(to right, var(--demo-bg-popover), transparent);
  }

  .Edge[data-side='start'][dir='rtl'] {
    background: linear-gradient(to left, var(--demo-bg-popover), transparent);
  }

  .Edge[data-side='end'] {
    width: 20%;
    background: linear-gradient(to left, var(--demo-bg-popover), transparent);
  }

  .Edge[data-side='end'][dir='rtl'] {
    background: linear-gradient(to right, var(--demo-bg-popover), transparent);
  }

  .Edge[data-side='top'] {
    height: 20%;
    background: linear-gradient(to bottom, var(--demo-bg-popover), transparent);
  }

  .Edge[data-side='bottom'] {
    height: 20%;
    background: linear-gradient(to top, var(--demo-bg-popover), transparent);
  }

  .Item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border: 1px solid var(--demo-border);
    border-radius: 6px;
    white-space: nowrap;
    user-select: none;
  }

  .ItemLogo {
    font-size: 1.5rem;
    line-height: 1;
  }

  .ItemName {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  @keyframes marqueeX {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(var(--marquee-translate));
    }
  }

  @keyframes marqueeY {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(var(--marquee-translate));
    }
  }
`
