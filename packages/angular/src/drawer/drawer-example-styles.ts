export const drawerExampleStyles = `
  [arkDrawerTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    border: 1px solid var(--demo-border-emphasized, #d6d3d1);
    background: var(--demo-bg-popover, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    cursor: pointer;
  }

  [arkDrawerTrigger]:hover {
    background: var(--demo-neutral-subtle, #f5f5f4);
    border-color: var(--demo-neutral-muted, #a8a29e);
  }

  [arkDrawerTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: 2px;
  }

  [arkDrawerBackdrop] {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: var(--demo-popover-z-index, 1000);
  }

  [arkDrawerBackdrop][data-state='open'] {
    animation: drawer-fade-in 0.5s cubic-bezier(0.32, 0.72, 0, 1);
  }

  [arkDrawerBackdrop][data-state='closed'] {
    animation: drawer-fade-out 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [arkDrawerPositioner] {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: var(--demo-popover-z-index, 1000);
  }

  [arkDrawerPositioner][data-swipe-direction='up'] {
    align-items: flex-start;
  }

  [arkDrawerPositioner][data-swipe-direction='left'] {
    justify-content: flex-start;
    align-items: stretch;
  }

  [arkDrawerPositioner][data-swipe-direction='right'] {
    justify-content: flex-end;
    align-items: stretch;
  }

  [arkDrawerContent] {
    --bleed: 3rem;
    position: relative;
    background: var(--demo-bg-popover, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: var(--demo-shadow-xl, 0 -10px 25px rgba(0, 0, 0, 0.1));
    outline: none;
    padding: 0 1.25rem;
    width: 100%;
    height: 100%;
    max-height: 96svh;
    display: flex;
    flex-direction: column;
    transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
  }

  [arkDrawerContent]::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    top: 100%;
    height: var(--bleed);
    background-color: inherit;
    pointer-events: none;
  }

  [arkDrawerContent][data-state='open'] {
    animation-name: drawer-slide-in-bottom;
  }

  [arkDrawerContent][data-state='closed'] {
    animation: drawer-slide-out-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [arkDrawerContent][data-swipe-direction='up'] {
    border-radius: 0 0 16px 16px;
  }

  [arkDrawerContent][data-swipe-direction='up']::after {
    top: auto;
    bottom: 100%;
  }

  [arkDrawerContent][data-swipe-direction='up'][data-state='open'] {
    animation-name: drawer-slide-in-top;
  }

  [arkDrawerContent][data-swipe-direction='up'][data-state='closed'] {
    animation: drawer-slide-out-top 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [arkDrawerContent][data-swipe-direction='left'] {
    max-height: none;
    max-width: 400px;
    border-radius: 0 16px 16px 0;
  }

  [arkDrawerContent][data-swipe-direction='left']::after {
    inset-inline: auto;
    inset-block: 0;
    top: 0;
    width: var(--bleed);
    height: auto;
    right: 100%;
  }

  [arkDrawerContent][data-swipe-direction='left'][data-state='open'] {
    animation-name: drawer-slide-in-left;
  }

  [arkDrawerContent][data-swipe-direction='left'][data-state='closed'] {
    animation: drawer-slide-out-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [arkDrawerContent][data-swipe-direction='right'] {
    max-height: none;
    max-width: 400px;
    border-radius: 16px 0 0 16px;
  }

  [arkDrawerContent][data-swipe-direction='right']::after {
    inset-inline: auto;
    inset-block: 0;
    top: 0;
    width: var(--bleed);
    height: auto;
    left: 100%;
  }

  [arkDrawerContent][data-swipe-direction='right'][data-state='open'] {
    animation-name: drawer-slide-in-right;
  }

  [arkDrawerContent][data-swipe-direction='right'][data-state='closed'] {
    animation: drawer-slide-out-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [arkDrawerGrabber] {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    padding: 20px 0;
    cursor: grab;
    touch-action: none;
    user-select: none;
  }

  [arkDrawerGrabber]:active {
    cursor: grabbing;
  }

  [arkDrawerGrabberIndicator] {
    display: block;
    width: 2.5rem;
    height: 0.25rem;
    border-radius: 1000px;
    background: var(--demo-neutral-muted, #a8a29e);
  }

  [arkDrawerGrabber]:hover [arkDrawerGrabberIndicator] {
    background-color: var(--demo-neutral-emphasized, #57534e);
  }

  [arkDrawerTitle] {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #1c1917);
  }

  [arkDrawerDescription] {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--demo-neutral-fg-muted, #57534e);
  }

  [arkDrawerCloseTrigger] {
    position: absolute;
    top: 3rem;
    right: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--demo-neutral-emphasized, #57534e);
    cursor: pointer;
  }

  [arkDrawerCloseTrigger] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkDrawerCloseTrigger]:hover {
    background: var(--demo-neutral-muted, #e7e5e4);
  }

  [arkDrawerCloseTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #ff7a5c);
    outline-offset: -1px;
  }

  .drawer-body {
    display: flex;
    flex: 1;
    min-height: 0;
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    flex-direction: column;
    gap: 1rem;
  }

  .drawer-scrollable {
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    padding: 0.5rem 0;
  }

  .drawer-scrollable::-webkit-scrollbar {
    width: 6px;
  }

  .drawer-scrollable::-webkit-scrollbar-track {
    background: transparent;
  }

  .drawer-scrollable::-webkit-scrollbar-thumb {
    background-color: var(--demo-neutral-muted, #a8a29e);
    border-radius: 3px;
  }

  .drawer-scrollable::-webkit-scrollbar-thumb:hover {
    background-color: var(--demo-neutral-emphasized, #57534e);
  }

  .drawer-scrollable-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 3rem;
    padding: 0 1rem;
    background: var(--demo-neutral-subtle, #f5f5f4);
    border: 1px solid var(--demo-border-emphasized, #d6d3d1);
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #1c1917);
  }

  .drawer-scrollable-item:hover {
    background: var(--demo-neutral-muted, #e7e5e4);
  }

  [arkDrawerIndent] {
    transition: border-radius 0.3s ease;
  }

  [arkDrawerIndent][data-active] {
    border-radius: calc(16px * (1 - var(--drawer-swipe-progress, 0)));
  }

  [arkDrawerIndentBackground] {
    position: fixed;
    inset: 0;
    z-index: var(--demo-popover-z-index, 1000);
    pointer-events: none;
    background: black;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  [arkDrawerIndentBackground][data-active] {
    opacity: calc(0.1 * (1 - var(--drawer-swipe-progress, 0)));
  }

  .button-group,
  .hstack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .field label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #1c1917);
  }

  .field input {
    height: 2.5rem;
    padding: 0 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--demo-border-emphasized, #d6d3d1);
    background: var(--demo-bg-popover, #ffffff);
    color: var(--demo-neutral-fg, #1c1917);
    font: inherit;
  }

  @keyframes drawer-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes drawer-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes drawer-slide-in-bottom {
    from { transform: translate3d(0, 100%, 0); }
    to { transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0); }
  }

  @keyframes drawer-slide-out-bottom {
    from { transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0); }
    to { transform: translate3d(0, 100%, 0); }
  }

  @keyframes drawer-slide-in-top {
    from { transform: translate3d(0, -100%, 0); }
    to { transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0); }
  }

  @keyframes drawer-slide-out-top {
    from { transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0); }
    to { transform: translate3d(0, -100%, 0); }
  }

  @keyframes drawer-slide-in-left {
    from { transform: translate3d(-100%, 0, 0); }
    to { transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0); }
  }

  @keyframes drawer-slide-out-left {
    from { transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0); }
    to { transform: translate3d(-100%, 0, 0); }
  }

  @keyframes drawer-slide-in-right {
    from { transform: translate3d(100%, 0, 0); }
    to { transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0); }
  }

  @keyframes drawer-slide-out-right {
    from { transform: translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0); }
    to { transform: translate3d(100%, 0, 0); }
  }
`
