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

  .Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding-inline: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
  }

  .Button svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  .Button:has(> svg:only-child) {
    padding-inline: 0.625rem !important;
  }

  .Button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .Button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .Button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .Button[data-variant='surface'] {
    border-color: var(--demo-border-emphasized);
    color: var(--demo-coral-fg);
  }

  .Button[data-variant='solid'] {
    background: var(--demo-coral-solid);
    border-color: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
  }

  .Button[data-variant='solid']:hover {
    background: var(--demo-coral-fg);
    border-color: var(--demo-coral-fg);
  }

  .Button[data-variant='solid']:focus-visible {
    outline-offset: 2px;
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
