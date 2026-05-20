export const sliderExampleStyles = `
  [arkSlider],
  [arkSliderRootProvider] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
    max-width: 16rem;
  }

  [arkSlider][data-orientation='vertical'],
  [arkSliderRootProvider][data-orientation='vertical'] {
    height: 12rem;
    max-width: max-content;
  }

  [arkSliderLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    user-select: none;
  }

  [arkSliderValueText] {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
  }

  [arkSliderControl] {
    position: relative;
    display: flex;
    align-items: center;
    height: 1.25rem;
  }

  [arkSliderControl][data-orientation='vertical'] {
    flex-direction: column;
    height: 100%;
    width: 1.25rem;
  }

  [arkSliderTrack] {
    flex: 1;
    height: 0.375rem;
    background: var(--demo-neutral-muted);
    border-radius: 9999px;
    overflow: hidden;
  }

  [arkSliderTrack][data-orientation='vertical'] {
    height: 100%;
    width: 0.375rem;
  }

  [arkSliderRange] {
    height: 100%;
    background: var(--demo-coral-solid);
    border-radius: 9999px;
  }

  [arkSliderRange][data-orientation='vertical'] {
    width: 100%;
  }

  [arkSliderThumb] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    background: var(--demo-bg-thumb);
    border: 2px solid var(--demo-coral-solid);
    border-radius: 9999px;
    outline: none;
    box-shadow: var(--demo-shadow-xs);
    transition:
      box-shadow 0.15s ease,
      transform 0.1s ease;
  }

  [arkSliderThumb]:focus-visible {
    box-shadow: 0 0 0 2px var(--demo-coral-focus-ring);
  }

  [arkSliderThumb][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkSliderDraggingIndicator] {
    background: var(--demo-neutral-fg);
    color: white;
    top: -28px;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1;
    font-weight: 500;
    border-radius: 0.25rem;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }

  [arkSliderMarkerGroup] {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  [arkSliderMarkerGroup][data-orientation='vertical'] {
    flex-direction: column;
    height: 100%;
    margin-top: 0;
    margin-inline-start: 0.5rem;
  }

  [arkSliderMarker] {
    position: relative;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--demo-neutral-emphasized);
  }

  [arkSliderMarker]::before {
    content: '';
    display: block;
    position: absolute;
    width: 0.25rem;
    height: 0.25rem;
    background: var(--demo-border);
    border-radius: 9999px;
    top: -0.625rem;
    left: 50%;
    transform: translateX(-50%);
  }

  [arkSliderMarker]:is([data-state='under-value'], [data-state='at-value'])::before {
    background: var(--demo-coral-solid);
  }

  .slider-example-header {
    display: flex;
    justify-content: space-between;
  }

  .slider-example-button {
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
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    color: var(--demo-neutral-fg);
  }

  .slider-example-button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .slider-example-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }
`
