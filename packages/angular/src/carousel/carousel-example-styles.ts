export const carouselExampleStyles = `
  :host {
    display: block;
  }

  .stack,
  .vstack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .Root {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    width: 100%;
    max-width: 32rem;
  }

  .Root[data-orientation='vertical'] {
    flex-direction: row;
    max-width: max-content;
    height: 20rem;
  }

  .ItemGroup {
    display: flex;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    border-radius: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .ItemGroup::-webkit-scrollbar {
    display: none;
  }

  .Item {
    flex: 0 0 100%;
    min-width: 0;
  }

  .Item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    background-color: var(--demo-neutral-subtle);
  }

  .Slide {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 12rem;
    background: var(--demo-neutral-subtle);
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.5rem;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  .Control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .Control[data-orientation='vertical'] {
    flex-direction: column;
  }

  .Control[data-justify='center'] {
    justify-content: center;
  }

  .Trigger,
  .AutoplayTrigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    width: 2.25rem;
    height: 2.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    border-radius: 0.375rem;
    user-select: none;
    white-space: nowrap;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
  }

  .Trigger svg,
  .AutoplayTrigger svg {
    width: 1rem;
    height: 1rem;
  }

  .AutoplayTrigger {
    transition:
      background 150ms,
      border-color 150ms;
  }

  .Trigger:hover:not(:disabled, [data-disabled]),
  .AutoplayTrigger:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .Trigger:focus-visible,
  .AutoplayTrigger:focus-visible,
  .Indicator:focus-visible,
  .ThumbnailIndicator:focus-visible,
  .Button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  .Trigger:focus-visible,
  .AutoplayTrigger:focus-visible,
  .Button:focus-visible {
    outline-offset: -1px;
  }

  .Trigger:is(:disabled, [data-disabled]),
  .AutoplayTrigger:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .ProgressText {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    font-variant-numeric: tabular-nums;
  }

  .IndicatorGroup {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .IndicatorGroup[data-orientation='vertical'] {
    flex-direction: column;
  }

  .Indicator {
    width: 0.625rem;
    height: 0.625rem;
    background: var(--demo-neutral-muted);
    border-radius: 9999px;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .Indicator[data-current] {
    background: var(--demo-coral-solid);
  }

  .ThumbnailIndicator {
    width: 3.75rem;
    height: 2.5rem;
    padding: 0;
    border: 2px solid transparent;
    border-radius: 0.25rem;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.6;
    transition:
      border-color 200ms,
      opacity 200ms;
  }

  .ThumbnailIndicator[data-current] {
    border-color: var(--demo-coral-solid);
    opacity: 1;
  }

  .ThumbnailIndicator img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .StatusText {
    font-size: 0.875rem;
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
  }

  .Button svg {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
  }

  .Button:has(> svg:only-child) {
    padding-inline: 0.625rem !important;
  }

  .Button {
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
  }

  .Button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .Button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }
`
