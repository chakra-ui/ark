export const marqueeExampleStyles = `
  .marquee-stack {
    display: grid;
    gap: 16px;
    color: #111827;
  }

  .marquee-root {
    width: 100%;
    max-width: 600px;
    overflow: hidden;
    background: #ffffff;
    color: #111827;
  }

  .marquee-root[data-orientation='horizontal'] {
    height: 80px;
  }

  .marquee-root[data-orientation='vertical'] {
    width: 280px;
    height: 240px;
  }

  .marquee-viewport {
    width: 100%;
    height: 100%;
  }

  .marquee-content {
    align-items: center;
    animation-delay: var(--marquee-delay);
    animation-duration: var(--marquee-duration);
    animation-iteration-count: var(--marquee-loop-count);
    animation-timing-function: linear;
  }

  .marquee-content[data-side='start'],
  .marquee-content[data-side='end'] {
    animation-name: marquee-x;
  }

  .marquee-content[data-side='top'],
  .marquee-content[data-side='bottom'] {
    animation-name: marquee-y;
  }

  .marquee-root[data-paused],
  .marquee-root[data-paused] * {
    animation-play-state: paused !important;
  }

  .marquee-content[data-reverse] {
    animation-direction: reverse;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-content {
      animation: none !important;
    }
  }

  .marquee-item {
    display: inline-flex;
    min-width: 132px;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #f9fafb;
    color: #111827;
    font-size: 14px;
    line-height: 1;
    white-space: nowrap;
  }

  .marquee-code {
    display: inline-grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border-radius: 50%;
    background: #111827;
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
  }

  .marquee-edge {
    z-index: 1;
    pointer-events: none;
  }

  .marquee-edge[data-side='start'] {
    width: 20%;
    background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0));
  }

  .marquee-edge[data-side='start'][dir='rtl'] {
    background: linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0));
  }

  .marquee-edge[data-side='end'] {
    width: 20%;
    background: linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0));
  }

  .marquee-edge[data-side='end'][dir='rtl'] {
    background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0));
  }

  .marquee-edge[data-side='top'] {
    height: 20%;
    background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0));
  }

  .marquee-edge[data-side='bottom'] {
    height: 20%;
    background: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0));
  }

  .marquee-root[data-orientation='vertical'] .marquee-edge {
    width: 100%;
    height: 20%;
  }

  .marquee-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .marquee-button {
    display: inline-flex;
    min-height: 34px;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #ffffff;
    color: #111827;
    font: inherit;
    cursor: pointer;
  }

  .marquee-button:hover {
    background: #f3f4f6;
  }

  .marquee-meta {
    display: flex;
    gap: 16px;
    color: #4b5563;
    font-size: 14px;
  }

  @keyframes marquee-x {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(var(--marquee-translate));
    }
  }

  @keyframes marquee-y {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(var(--marquee-translate));
    }
  }
`
