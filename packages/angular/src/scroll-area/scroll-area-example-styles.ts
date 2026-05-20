export const scrollAreaExampleStyles = `
  .scroll-area-root {
    color: var(--demo-neutral-fg, #27272a);
    box-sizing: border-box;
    width: 24rem;
    height: 8.5rem;
    max-width: calc(100vw - 8rem);
  }

  .scroll-area-viewport {
    height: 100%;
    border-radius: 0.5rem;
    outline: 1px solid var(--demo-border, #d4d4d8);
    outline-offset: -1px;
    overscroll-behavior: contain;
    scrollbar-width: none;
  }

  .scroll-area-viewport::-webkit-scrollbar {
    display: none;
  }

  .scroll-area-viewport:focus-visible {
    outline: 2px solid var(--demo-coral-solid, #e11d48);
  }

  .scroll-area-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-block: 0.75rem;
    padding-inline-start: 1rem;
    padding-inline-end: 1.5rem;
  }

  .scroll-area-content--wide {
    width: 50vw;
  }

  .scroll-area-paragraph {
    margin: 0;
    color: var(--demo-neutral-fg, #27272a);
    font-size: 0.875rem;
    line-height: 1.375rem;
  }

  .scroll-area-paragraph--wide {
    width: 50vw;
  }

  .scroll-area-scrollbar {
    display: flex;
    position: relative;
    background-color: var(--demo-neutral-muted, #f4f4f5);
    border-radius: 0.375rem;
    margin: 0.5rem;
    opacity: 0;
    transition: opacity 150ms;
    pointer-events: none;
  }

  .scroll-area-scrollbar::before {
    content: '';
    position: absolute;
  }

  .scroll-area-scrollbar[data-scrolling] {
    transition-duration: 0ms;
  }

  .scroll-area-scrollbar[data-hover],
  .scroll-area-scrollbar[data-scrolling] {
    opacity: 1;
    pointer-events: auto;
  }

  .scroll-area-scrollbar[data-orientation="vertical"] {
    width: 0.25rem;
  }

  .scroll-area-scrollbar[data-orientation="vertical"]::before {
    width: 1.25rem;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .scroll-area-scrollbar[data-orientation="vertical"]:not([data-overflow-y]) {
    display: none;
  }

  .scroll-area-scrollbar[data-orientation="horizontal"] {
    height: 0.25rem;
  }

  .scroll-area-scrollbar[data-orientation="horizontal"]::before {
    width: 100%;
    height: 1.25rem;
    left: 0;
    right: 0;
    bottom: -0.5rem;
  }

  .scroll-area-scrollbar[data-orientation="horizontal"]:not([data-overflow-x]) {
    display: none;
  }

  .scroll-area-thumb {
    width: 100%;
    border-radius: inherit;
    background-color: var(--demo-neutral-solid, #71717a);
  }

  .scroll-area-scrollbar[data-orientation="horizontal"] .scroll-area-thumb {
    width: unset;
    height: 100%;
  }

  .scroll-area-corner {
    background-color: transparent;
  }
`
