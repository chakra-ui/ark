export const angleSliderExampleStyles = `
  [arkAngleSlider],
  [arkAngleSliderRootProvider] {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  [arkAngleSlider][data-disabled],
  [arkAngleSliderRootProvider][data-disabled] {
    opacity: 0.6;
    filter: grayscale(100%);
  }

  [arkAngleSliderLabel] {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--demo-neutral-emphasized);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    user-select: none;
  }

  [arkAngleSliderControl] {
    --size: 100px;
    --thumb-size: 36px;
    --track-width: 4px;

    position: relative;
    width: var(--size);
    height: var(--size);
    border-radius: 9999px;
    background: var(--demo-neutral-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.06),
      0 4px 12px -4px rgba(0, 0, 0, 0.1);
  }

  [arkAngleSliderControl]::before {
    content: '';
    position: absolute;
    inset: var(--track-width);
    border-radius: 9999px;
    background: var(--demo-bg-popover);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  [arkAngleSliderControl]::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--demo-neutral-emphasized);
    border-radius: 9999px;
    z-index: 1;
  }

  [arkAngleSliderControl][data-focus] {
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.06),
      0 0 0 3px var(--demo-coral-focus-ring);
  }

  [arkAngleSliderThumb] {
    position: absolute;
    top: 0;
    bottom: 0;
    --thumb-width: 3px;
    left: calc(50% - var(--thumb-width) / 2);
    height: 100%;
    width: var(--thumb-width);
    outline: none;
    z-index: 2;
  }

  [arkAngleSliderThumb]::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 4px;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    background: var(--demo-coral-solid);
    border: 2px solid var(--demo-bg-popover);
    border-radius: 9999px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.15s ease;
  }

  [arkAngleSliderThumb]::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 14px;
    transform: translateX(-50%);
    width: 2px;
    height: calc(var(--size) / 2 - 18px);
    background: linear-gradient(to bottom, var(--demo-coral-solid), transparent);
    border-radius: 1px;
  }

  [arkAngleSliderThumb]:focus-visible::before {
    box-shadow:
      0 0 0 3px var(--demo-coral-focus-ring),
      0 2px 6px rgba(0, 0, 0, 0.2);
  }

  [arkAngleSliderThumb]:active::before {
    transform: translateX(-50%) scale(1.1);
  }

  [arkAngleSliderMarkerGroup] {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    pointer-events: none;
    z-index: 0;
  }

  [arkAngleSliderMarker] {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    left: calc(50% - 1px);
  }

  [arkAngleSliderMarker]::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 6px;
    transform: translateX(-50%);
    width: 2px;
    height: 6px;
    background: var(--demo-border-emphasized);
    border-radius: 1px;
  }

  [arkAngleSliderMarker][data-state='at-value']::before {
    background: var(--demo-coral-solid);
  }

  [arkAngleSliderMarker][data-state='under-value']::before {
    background: var(--demo-coral-muted);
  }

  [arkAngleSliderValueText] {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1;
    color: var(--demo-neutral-fg);
    font-variant-numeric: tabular-nums;
  }

  .stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    border: 1px solid var(--demo-border-emphasized);
    background: transparent;
    color: var(--demo-neutral-fg);
    white-space: nowrap;
    user-select: none;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }
`
