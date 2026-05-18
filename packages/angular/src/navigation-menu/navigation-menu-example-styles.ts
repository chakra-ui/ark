export const navigationMenuExampleStyles = `
  [arkNavigationMenu] {
    display: inline-flex;
    position: relative;
  }

  [arkNavigationMenuList] {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0.25rem;
  }

  [arkNavigationMenuItem] {
    position: relative;
  }

  [arkNavigationMenuTrigger] {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    background: var(--demo-coral-9, #c7553f);
    color: white;
    border: 1px solid transparent;
    cursor: pointer;
  }

  [arkNavigationMenuTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkNavigationMenuContent] {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    min-width: 12rem;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    z-index: 50;
  }

  [arkNavigationMenuContent][hidden] {
    display: none;
  }

  [arkNavigationMenuLink] {
    display: block;
    padding: 0.375rem 0.5rem;
    font-size: 0.8125rem;
    border-radius: 0.25rem;
    color: var(--demo-neutral-fg, #1c1917);
    text-decoration: none;
  }

  [arkNavigationMenuLink][data-current] {
    color: var(--demo-coral-11, #8a2d1a);
  }

  [arkNavigationMenuIndicator] {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 40;
    pointer-events: none;
  }

  [arkNavigationMenuViewportPositioner] {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  [arkNavigationMenuViewport] {
    background: var(--demo-bg, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    pointer-events: auto;
  }

  [arkNavigationMenuArrow] {
    --arrow-size: 8px;
    --arrow-background: var(--demo-bg, #ffffff);
  }
`
