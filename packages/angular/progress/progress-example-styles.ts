const progressButtonStyles = `
  .progress-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg);
    white-space: nowrap;
    user-select: none;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .progress-button:hover {
    background: var(--demo-neutral-subtle);
  }

  .progress-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }
`

export const progressLinearExampleStyles = `
  [arkProgress],
  [arkProgressRootProvider] {
    color: var(--demo-neutral-fg);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    row-gap: 0.5rem;
    width: 100%;
    max-width: 16rem;
  }

  [arkProgressLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  [arkProgressValueText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
    text-align: right;
  }

  [arkProgressTrack] {
    grid-column: 1 / -1;
    height: 0.375rem;
    background: var(--demo-neutral-muted);
    border-radius: 9999px;
    overflow: hidden;
  }

  [arkProgressTrack][data-orientation='vertical'] {
    height: 8rem;
    width: 0.375rem;
  }

  [arkProgressRange] {
    height: 100%;
    background: var(--demo-coral-solid);
    border-radius: 9999px;
    transition: width 0.3s ease-out;
  }

  [arkProgressRange][data-orientation='vertical'] {
    width: 100%;
    transition: height 0.3s ease-out;
  }

  [arkProgressRange][data-orientation='horizontal'][data-state='indeterminate'] {
    width: 50%;
    animation: ark-progress-indeterminate-x 1s ease-in-out infinite;
  }

  [arkProgressRange][data-orientation='vertical'][data-state='indeterminate'] {
    height: 50%;
    animation: ark-progress-indeterminate-y 1s ease-in-out infinite;
  }

  @keyframes ark-progress-indeterminate-x {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(200%);
    }
  }

  @keyframes ark-progress-indeterminate-y {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(200%);
    }
  }

  ${progressButtonStyles}
`

export const progressCircularExampleStyles = `
  [arkProgress],
  [arkProgressRootProvider] {
    color: var(--demo-neutral-fg);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  [arkProgressLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  .progress-circle-container {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  svg[arkProgressCircle] {
    --size: 6rem;
    --thickness: 0.5rem;
    width: var(--size);
    height: var(--size);
  }

  circle[arkProgressCircleTrack] {
    stroke: var(--demo-neutral-muted);
  }

  circle[arkProgressCircleRange] {
    stroke: var(--demo-coral-solid);
    transition: stroke-dashoffset 0.3s ease-out;
  }

  [arkProgressValueText] {
    position: absolute;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  ${progressButtonStyles}
`
