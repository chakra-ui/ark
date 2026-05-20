export const accordionExampleStyles = `
  :host {
    display: block;
    color: var(--demo-neutral-fg);
  }

  [arkAccordion],
  [arkAccordionRootProvider] {
    color: var(--demo-neutral-fg);
    --px: 0.5rem;
    --py: 0.625rem;
    display: flex;
  }

  [arkAccordion][data-orientation='horizontal'],
  [arkAccordionRootProvider][data-orientation='horizontal'] {
    flex-direction: row;
    height: 20rem;
    max-height: calc(100vh - 8rem);
  }

  [arkAccordion][data-orientation='vertical'],
  [arkAccordionRootProvider][data-orientation='vertical'] {
    flex-direction: column;
    width: 24rem;
    max-width: calc(100vw - 8rem);
  }

  [arkAccordionItem] {
    overflow-anchor: none;
  }

  [arkAccordionItem][data-orientation='vertical'] {
    display: block;
    border-bottom: 1px solid var(--demo-border);
  }

  [arkAccordionItem][data-orientation='horizontal'] {
    display: flex;
    border-inline-end: 1px solid var(--demo-border);
  }

  [arkAccordionItem][data-disabled] {
    opacity: 0.5;
  }

  [arkAccordionItemTrigger] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-inline: var(--px);
    margin: 0;
    border: none;
    background: transparent;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: start;
    outline: none;
  }

  [arkAccordionItemTrigger][data-orientation='vertical'] {
    width: 100%;
    min-height: 2.5rem;
  }

  [arkAccordionItemTrigger][data-orientation='horizontal'] {
    height: 100%;
    min-width: 2.5rem;
    writing-mode: sideways-lr;
  }

  [arkAccordionItemTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
  }

  [arkAccordionItemTrigger][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkAccordionItemIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--demo-neutral-fg);
    transition: rotate 200ms ease;
    transform-origin: center;
  }

  [arkAccordionItemIndicator][data-state='open'] {
    rotate: 180deg;
  }

  [arkAccordionItemIndicator] svg {
    width: 1.2em;
    height: 1.2em;
  }

  [arkAccordionItemContent] {
    overflow: hidden;
    border-radius: 0.5rem;
  }

  [arkAccordionItemContent][data-state='open'] {
    animation-duration: 200ms;
    animation-timing-function: ease-out;
  }

  [arkAccordionItemContent][data-state='open'][data-orientation='vertical'] {
    animation-name: expand-height, fade-in;
  }

  [arkAccordionItemContent][data-state='open'][data-orientation='horizontal'] {
    animation-name: expand-width, fade-in;
    will-change: width;
  }

  [arkAccordionItemContent][data-state='closed'] {
    animation-duration: 200ms;
    animation-timing-function: ease-out;
  }

  [arkAccordionItemContent][data-state='closed'][data-orientation='vertical'] {
    animation-name: collapse-height, fade-out;
  }

  [arkAccordionItemContent][data-state='closed'][data-orientation='horizontal'] {
    animation-name: collapse-width, fade-out;
    will-change: width;
  }

  [arkAccordionItemContent][data-orientation='horizontal'] > * {
    white-space: nowrap;
  }

  .item-body {
    padding-inline: var(--px);
    padding-bottom: var(--py);
    color: var(--demo-neutral-fg);
    line-height: 1.5;
  }

  .centered {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;
    background-color: var(--demo-neutral-subtle);
    height: 100%;
    width: 100%;
  }

  code {
    display: inline-flex;
    gap: 0.5rem;
    font-size: 0.75rem;
  }

  @keyframes expand-height {
    from {
      height: 0;
    }
    to {
      height: var(--height);
    }
  }

  @keyframes expand-width {
    from {
      width: 0;
    }
    to {
      width: var(--width);
    }
  }

  @keyframes collapse-width {
    from {
      width: var(--width);
    }
    to {
      width: 0;
    }
  }

  @keyframes collapse-height {
    from {
      height: var(--height);
    }
    to {
      height: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`
