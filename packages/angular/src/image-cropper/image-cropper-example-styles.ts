export const imageCropperExampleStyles = `
  :host {
    display: block;
    width: 100%;
    max-width: 32rem;
    color: var(--demo-neutral-fg);
  }

  .layout,
  .root,
  [arkImageCropper],
  [arkImageCropperRootProvider] {
    width: 100%;
  }

  .layout,
  .root {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .root,
  [arkImageCropper],
  [arkImageCropperRootProvider] {
    --cropper-accent: var(--demo-coral-solid);
    --cropper-line-width: 2px;
    --cropper-handler-size: 6px;
    --cropper-handler-width: 3px;
    --cropper-overlay-color: rgb(0 0 0 / 0.5);
    position: relative;
    max-width: 28rem;
    color: var(--demo-neutral-fg);
  }

  [data-scope='image-cropper'][data-part='viewport'] {
    position: relative;
    overflow: hidden;
    width: min(100%, 28rem);
    aspect-ratio: 16 / 9;
    background: var(--demo-neutral-subtle);
    border-radius: 0.5rem;
  }

  [data-scope='image-cropper'][data-part='image'] {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform-origin: center center;
    pointer-events: none;
    user-select: none;
    backface-visibility: hidden;
  }

  [data-scope='image-cropper'][data-part='selection'] {
    box-sizing: content-box;
    border: var(--cropper-line-width) solid rgb(255 255 255 / 0.5);
    box-shadow: 0 0 0 9999px var(--cropper-overlay-color);
    cursor: move;
    outline: none;
    backface-visibility: hidden;
  }

  [data-scope='image-cropper'][data-part='selection'][data-shape='circle'] {
    border-radius: 999px;
  }

  [data-scope='image-cropper'][data-part='selection']:focus-visible {
    border-color: var(--cropper-accent);
  }

  [data-scope='image-cropper'][data-part='selection'][data-disabled] {
    cursor: default;
  }

  [data-scope='image-cropper'][data-part='selection'][data-dragging] {
    cursor: grabbing;
    border-color: rgb(255 255 255 / 0.8);
  }

  [data-scope='image-cropper'][data-part='handle'] {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
    width: calc(var(--cropper-handler-size) + 8px);
    height: calc(var(--cropper-handler-size) + 8px);
  }

  [data-scope='image-cropper'][data-part='handle'] > span {
    display: block;
    width: var(--cropper-handler-size);
    height: var(--cropper-handler-size);
    background: var(--demo-bg-popover);
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
    transition:
      opacity 0.2s ease,
      transform 0.15s ease;
  }

  [data-scope='image-cropper'][data-part='handle'][data-disabled] {
    display: none;
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='nw'],
  [data-scope='image-cropper'][data-part='handle'][data-position='ne'],
  [data-scope='image-cropper'][data-part='handle'][data-position='se'],
  [data-scope='image-cropper'][data-part='handle'][data-position='sw'] {
    cursor: nwse-resize;
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='ne'],
  [data-scope='image-cropper'][data-part='handle'][data-position='sw'] {
    cursor: nesw-resize;
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='nw']:hover > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='ne']:hover > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='se']:hover > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='sw']:hover > span {
    transform: scale(1.1);
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='nw'] > span {
    border-top: var(--cropper-handler-width) solid var(--cropper-accent);
    border-left: var(--cropper-handler-width) solid var(--cropper-accent);
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='ne'] > span {
    border-top: var(--cropper-handler-width) solid var(--cropper-accent);
    border-right: var(--cropper-handler-width) solid var(--cropper-accent);
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='se'] > span {
    border-right: var(--cropper-handler-width) solid var(--cropper-accent);
    border-bottom: var(--cropper-handler-width) solid var(--cropper-accent);
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='sw'] > span {
    border-bottom: var(--cropper-handler-width) solid var(--cropper-accent);
    border-left: var(--cropper-handler-width) solid var(--cropper-accent);
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='n'] > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='s'] > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='e'] > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='w'] > span {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--cropper-accent);
    opacity: 0;
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='n']:hover > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='s']:hover > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='e']:hover > span,
  [data-scope='image-cropper'][data-part='handle'][data-position='w']:hover > span {
    opacity: 1;
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='n'],
  [data-scope='image-cropper'][data-part='handle'][data-position='s'] {
    cursor: ns-resize;
  }

  [data-scope='image-cropper'][data-part='handle'][data-position='e'],
  [data-scope='image-cropper'][data-part='handle'][data-position='w'] {
    cursor: ew-resize;
  }

  [data-scope='image-cropper'][data-part='grid'] {
    position: absolute;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    border-color: rgb(255 255 255 / 0.4);
    border-style: solid;
  }

  [data-scope='image-cropper'][data-part='grid'][data-axis='horizontal'] {
    inset: 33.33% 0;
    border-width: 1px 0;
  }

  [data-scope='image-cropper'][data-part='grid'][data-axis='vertical'] {
    inset: 0 33.33%;
    border-width: 0 1px;
  }

  [data-scope='image-cropper'][data-part='grid'][data-dragging],
  [data-scope='image-cropper'][data-part='grid'][data-panning] {
    opacity: 1;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg);
    padding-inline: 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    white-space: nowrap;
    user-select: none;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  button > * {
    flex-shrink: 0;
  }

  button[aria-label] {
    padding-inline: 0.625rem;
  }

  button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  button:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  button[data-variant='solid'] {
    border-color: var(--demo-coral-solid);
    background: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
  }

  button[data-variant='solid']:hover {
    border-color: var(--demo-coral-fg);
    background: var(--demo-coral-fg);
  }

  button[data-variant='solid']:focus-visible {
    outline-offset: 2px;
  }

  button[data-variant='surface'] {
    border-color: var(--demo-border-emphasized);
    color: var(--demo-coral-fg);
  }

  .meter {
    min-width: 3rem;
    text-align: center;
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
  }

  .description {
    margin: 0;
    color: var(--demo-neutral-fg-muted);
    font-size: 0.875rem;
  }

  .preview,
  .data-display {
    border: 1px solid var(--demo-border);
    border-radius: 0.5rem;
    background: var(--demo-neutral-subtle);
  }

  .preview {
    display: grid;
    gap: 0.5rem;
    padding: 1rem;
  }

  .preview-label,
  .data-label {
    color: var(--demo-neutral-emphasized);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .preview-image {
    max-width: 120px;
    max-height: 120px;
    border-radius: 0.25rem;
    object-fit: contain;
  }

  .data-display {
    display: flex;
    gap: 1.5rem;
    padding: 0.75rem 1rem;
  }

  .data-item {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .data-value {
    color: var(--demo-neutral-fg);
    font-size: 0.875rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
`
