export const scrollAreaExampleStyles = `
  .scroll-area-root {
    width: min(100%, 28rem);
    height: 14rem;
    border: 1px solid #d4d4d8;
    background: #ffffff;
  }

  .scroll-area-root[data-overflow-x],
  .scroll-area-root[data-overflow-y] {
    padding: 0;
  }

  .scroll-area-viewport {
    width: 100%;
    height: 100%;
    padding: 1rem;
  }

  .scroll-area-content {
    display: grid;
    gap: 0.875rem;
  }

  .scroll-area-content--wide {
    width: 44rem;
  }

  .scroll-area-paragraph {
    margin: 0;
    color: #27272a;
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  .scroll-area-scrollbar {
    display: flex;
    padding: 0.125rem;
    background: #f4f4f5;
  }

  .scroll-area-scrollbar[data-orientation="vertical"] {
    width: 0.75rem;
  }

  .scroll-area-scrollbar[data-orientation="horizontal"] {
    height: 0.75rem;
  }

  .scroll-area-thumb {
    flex: 1;
    border-radius: 999px;
    background: #71717a;
  }

  .scroll-area-corner {
    background: #f4f4f5;
  }

  .scroll-area-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .scroll-area-actions button {
    min-height: 2.75rem;
    border: 1px solid #a1a1aa;
    background: #ffffff;
    color: #18181b;
    padding: 0 0.875rem;
    font: inherit;
  }
`
