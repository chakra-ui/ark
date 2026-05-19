export const marqueeExampleStyles = `
  .marquee-stack {
    display: grid;
    gap: 16px;
    color: #111827;
  }

  .marquee-root {
    width: min(100%, 640px);
    min-height: 72px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #ffffff;
  }

  .marquee-root[data-orientation='vertical'] {
    width: 280px;
    height: 260px;
  }

  .marquee-viewport {
    align-items: center;
  }

  .marquee-content {
    align-items: center;
    animation: marquee-scroll var(--marquee-duration) linear var(--marquee-delay) var(--marquee-loop-count);
    animation-direction: normal;
    animation-play-state: running;
  }

  .marquee-root[data-paused] .marquee-content {
    animation-play-state: paused;
  }

  .marquee-content[data-reverse] {
    animation-direction: reverse;
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
    width: 48px;
    height: 100%;
    background: linear-gradient(to var(--edge-direction, right), #ffffff, rgba(255, 255, 255, 0));
    z-index: 1;
  }

  .marquee-edge[data-side='end'] {
    --edge-direction: left;
  }

  .marquee-root[data-orientation='vertical'] .marquee-edge {
    width: 100%;
    height: 48px;
  }

  .marquee-root[data-orientation='vertical'] .marquee-edge[data-side='top'] {
    --edge-direction: bottom;
  }

  .marquee-root[data-orientation='vertical'] .marquee-edge[data-side='bottom'] {
    --edge-direction: top;
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

  @keyframes marquee-scroll {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: var(--marquee-translate);
    }
  }
`
