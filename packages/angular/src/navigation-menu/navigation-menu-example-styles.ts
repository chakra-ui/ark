export const navigationMenuExampleStyles = `
  [arkNavigationMenu] {
    --arrow-size: 16px;
    --indicator-size: 10px;
    display: block;
    position: relative;
    width: 100%;
  }

  [arkNavigationMenu] > output,
  .stack > output {
    display: block;
    margin-block-end: 0.75rem;
    color: var(--demo-neutral-muted, #78716c);
    font: 0.875rem/1.25rem ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  [arkNavigationMenuList] {
    all: unset;
    display: flex;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  [arkNavigationMenuList][data-orientation='vertical'] {
    flex-direction: column;
  }

  [arkNavigationMenuItem] {
    position: relative;
  }

  [data-variant='viewport'] [arkNavigationMenuItem] {
    position: static;
  }

  [arkNavigationMenuTrigger],
  [arkNavigationMenuLink] {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg, #1c1917);
    display: inline-flex;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    gap: 0.5rem;
    line-height: 1.25rem;
    padding-block: 0.5rem;
    padding-inline: 1rem;
    text-decoration: none;
    transition: background 150ms, border-color 150ms, color 150ms;
    user-select: none;
    white-space: nowrap;
  }

  [arkNavigationMenuTrigger] {
    cursor: pointer;
    gap: 0.25rem;
    justify-content: center;
  }

  [arkNavigationMenuTrigger]:is(:hover, [data-state='open']):not(:disabled, [data-disabled]),
  [arkNavigationMenuLink]:hover:not([data-disabled]) {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  [arkNavigationMenuTrigger]:focus-visible,
  [arkNavigationMenuLink]:focus-visible,
  .navigation-menu__viewport-link:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  [arkNavigationMenuTrigger]:is(:disabled, [data-disabled]),
  [arkNavigationMenuLink][data-disabled] {
    cursor: not-allowed;
    filter: grayscale(100%);
    opacity: 0.5;
  }

  [arkNavigationMenuLink][data-current] {
    color: var(--demo-coral-fg, #c7553f);
  }

  .navigation-menu__trigger-icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;
  }

  .navigation-menu__trigger-icon svg {
    height: 1rem;
    transition: rotate 200ms ease;
    width: 1rem;
  }

  [data-state='open'] > .navigation-menu__trigger-icon svg,
  [arkNavigationMenuItemIndicator][data-state='open'] svg {
    rotate: -180deg;
  }

  [arkNavigationMenuContent] {
    background: var(--demo-bg-popover, #ffffff);
    border: 1px solid var(--demo-border-emphasized, #d6d3d1);
    border-radius: 0.5rem;
    box-shadow: var(--demo-shadow-2xl, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1));
    color: var(--demo-neutral-fg, #1c1917);
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    left: 0;
    margin-top: 0.5rem;
    min-width: 12rem;
    outline: none;
    padding: 0.5rem;
    position: absolute;
    top: 100%;
    transform-origin: top left;
    width: max-content;
    z-index: var(--demo-popover-z-index, 50);
  }

  [arkNavigationMenuContent][dir='rtl'] {
    left: unset;
    right: 0;
    transform-origin: top right;
  }

  [arkNavigationMenuContent][data-state='open'],
  [arkNavigationMenuViewport][data-state='open'] {
    animation: navigation-menu-scale-in 0.2s ease-out;
  }

  [arkNavigationMenuContent][data-state='closed'],
  [arkNavigationMenuViewport][data-state='closed'] {
    animation: navigation-menu-scale-out 0.15s ease-in;
  }

  [arkNavigationMenuContent][hidden],
  [arkNavigationMenuViewport][hidden] {
    display: none;
  }

  [arkNavigationMenuContent] [arkNavigationMenuLink],
  .navigation-menu__viewport-link {
    align-items: center;
    border-radius: 0.25rem;
    color: inherit;
    display: flex;
    font-size: 0.875rem;
    font-weight: 400;
    gap: 0.5rem;
    line-height: 1.25rem;
    min-height: 2rem;
    outline: none;
    padding-block: 0.375rem;
    padding-inline: 0.725rem;
    text-decoration: none;
    user-select: none;
  }

  [arkNavigationMenuContent] [arkNavigationMenuLink][data-highlighted],
  [arkNavigationMenuContent] [arkNavigationMenuLink]:focus-visible,
  .navigation-menu__viewport-link:hover,
  .navigation-menu__viewport-link:focus-visible {
    background: var(--demo-neutral-subtle, #f5f5f4);
  }

  [arkNavigationMenuIndicator] {
    display: flex;
    height: var(--indicator-size);
    justify-content: center;
    left: 0;
    pointer-events: none;
    top: calc(var(--indicator-size) * -1);
    transition: translate 250ms ease, width 250ms ease;
    z-index: 1;
  }

  [data-variant='viewport'] [arkNavigationMenuIndicator] {
    bottom: calc(var(--indicator-size) * -1);
    top: unset;
  }

  [arkNavigationMenuIndicator][data-orientation='horizontal'] {
    translate: var(--trigger-x) 0;
    width: var(--trigger-width);
  }

  [arkNavigationMenuIndicator][data-orientation='vertical'] {
    height: var(--trigger-height);
    top: 0;
    translate: 0 var(--trigger-y);
  }

  [arkNavigationMenuIndicator][data-state='open'] {
    animation: navigation-menu-fade-in 250ms ease;
  }

  [arkNavigationMenuIndicator][data-state='closed'] {
    animation: navigation-menu-fade-out 250ms ease;
  }

  [arkNavigationMenuArrow] {
    background-color: var(--demo-bg-popover, #ffffff);
    border-left: 1px solid var(--demo-border-emphasized, #d6d3d1);
    border-radius: 3px 0 0 0;
    border-top: 1px solid var(--demo-border-emphasized, #d6d3d1);
    box-shadow:
      0 -6px 24px -8px rgba(0, 0, 0, 0.18),
      hsl(206 22% 7% / 35%) 0 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0 10px 20px -15px;
    height: var(--arrow-size);
    position: relative;
    rotate: 45deg;
    top: 3px;
    width: var(--arrow-size);
  }

  [arkNavigationMenuViewportPositioner] {
    display: flex;
    position: absolute;
  }

  [arkNavigationMenuViewportPositioner][data-orientation='horizontal'] {
    left: 0;
    top: 100%;
    width: 100%;
  }

  [arkNavigationMenuViewportPositioner][data-orientation='vertical'] {
    height: 100%;
    left: 100%;
    top: 0;
  }

  [arkNavigationMenuViewportPositioner][data-align='start'] {
    justify-content: flex-start;
  }

  [arkNavigationMenuViewportPositioner][data-align='center'] {
    justify-content: center;
  }

  [arkNavigationMenuViewportPositioner][data-align='end'] {
    justify-content: flex-end;
  }

  [arkNavigationMenuViewport] {
    background: var(--demo-bg-popover, #ffffff);
    border: 1px solid var(--demo-border-emphasized, #d6d3d1);
    border-radius: 0.5rem;
    box-shadow:
      hsl(206 22% 7% / 35%) 0 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0 10px 20px -15px;
    height: var(--viewport-height);
    left: 0;
    margin-top: var(--indicator-size);
    overflow: hidden;
    position: relative;
    top: 0;
    transform-origin: top center;
    transition: width 300ms ease, height 300ms ease;
    width: 100%;
  }

  @media (min-width: 600px) {
    [arkNavigationMenuViewport] {
      width: var(--viewport-width);
    }
  }

  .navigation-menu__viewport-content {
    display: grid;
    gap: 1.25rem;
    padding: 2.5rem;
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform, opacity;
  }

  .navigation-menu__viewport-content--products {
    grid-template-columns: 1fr 2fr;
    width: 600px;
  }

  .navigation-menu__viewport-content--company {
    grid-template-columns: 1fr 1fr;
    width: 450px;
  }

  .navigation-menu__viewport-content--developers {
    grid-template-columns: 1.6fr 1fr;
    width: 650px;
  }

  .navigation-menu__viewport-content[data-motion='from-start'] {
    animation: navigation-menu-from-left 250ms ease;
  }

  .navigation-menu__viewport-content[data-motion='from-end'] {
    animation: navigation-menu-from-right 250ms ease;
  }

  .navigation-menu__viewport-content[data-motion='to-start'] {
    animation: navigation-menu-to-left 250ms ease;
  }

  .navigation-menu__viewport-content[data-motion='to-end'] {
    animation: navigation-menu-to-right 250ms ease;
  }

  @keyframes navigation-menu-scale-in {
    from {
      opacity: 0;
      transform: rotateX(-30deg) scale(0.9);
    }
    to {
      opacity: 1;
      transform: rotateX(0deg) scale(1);
    }
  }

  @keyframes navigation-menu-scale-out {
    from {
      opacity: 1;
      transform: rotateX(0deg) scale(1);
    }
    to {
      opacity: 0;
      transform: rotateX(-10deg) scale(0.95);
    }
  }

  @keyframes navigation-menu-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes navigation-menu-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes navigation-menu-from-right {
    from {
      opacity: 0;
      transform: translate3d(200px, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes navigation-menu-from-left {
    from {
      opacity: 0;
      transform: translate3d(-200px, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes navigation-menu-to-right {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(200px, 0, 0);
    }
  }

  @keyframes navigation-menu-to-left {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-200px, 0, 0);
    }
  }
`
