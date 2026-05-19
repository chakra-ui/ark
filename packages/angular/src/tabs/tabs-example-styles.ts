export const tabsExampleStyles = `
  [arkTabs] {
    color: var(--demo-neutral-fg, #1c1917);
    display: flex;
    max-width: 32rem;
  }

  [arkTabs][data-orientation="horizontal"] {
    flex-direction: column;
  }

  [arkTabs][data-orientation="vertical"] {
    flex-direction: row;
  }

  [arkTabsList] {
    display: inline-flex;
    position: relative;
    isolation: isolate;
    gap: 0.25rem;
  }

  [arkTabsList][data-orientation="horizontal"] {
    flex-direction: row;
  }

  [arkTabsList][data-orientation="vertical"] {
    flex-direction: column;
  }

  [arkTabsTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    padding-inline: 0.75rem;
    height: 2rem;
    color: inherit;
    white-space: nowrap;
    user-select: none;
    appearance: none;
    cursor: pointer;
    text-decoration: none;
  }

  [arkTabsTrigger][data-orientation="vertical"] {
    justify-content: flex-start;
    width: 100%;
    padding-block: 0.5rem;
  }

  [arkTabsTrigger][data-selected] {
    background: var(--demo-coral-subtle, #ffe7df);
    color: var(--demo-coral-fg, #9f2f1d);
  }

  [arkTabsIndicator] ~ [arkTabsTrigger][data-selected],
  [arkTabs]:has([arkTabsIndicator]) [arkTabsTrigger][data-selected] {
    background: transparent;
  }

  [arkTabs]:has([arkTabsIndicator]) [arkTabsTrigger][data-selected] {
    color: var(--demo-coral-fg, #9f2f1d);
  }

  [arkTabsTrigger][data-disabled] {
    cursor: not-allowed;
    filter: grayscale(100%);
    opacity: 0.5;
  }

  [arkTabsTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkTabsContent] {
    outline: none;
    font-size: 0.875rem;
    padding-block: 0.725rem;
  }

  [arkTabsContent][data-orientation="vertical"] {
    padding-inline-start: 1rem;
    padding-block: 0;
  }

  [arkTabsContent][hidden] {
    display: none;
  }

  [arkTabsContent]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -2px;
    border-radius: 0.25rem;
  }

  [arkTabsIndicator] {
    position: absolute;
    z-index: -1;
    background: var(--demo-coral-subtle, #ffe7df);
    border-radius: 0.375rem;
    transition-property: width, height, left, top;
    transition-duration: 200ms;
    transition-timing-function: ease-out;
  }

  [arkTabsIndicator][data-orientation="horizontal"] {
    height: 2rem;
    width: var(--width);
  }

  [arkTabsIndicator][data-orientation="vertical"] {
    width: calc(100% - 0.5rem);
    height: var(--height);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`
