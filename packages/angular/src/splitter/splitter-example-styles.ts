export const splitterExampleStyles = `
.stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.splitter-root {
  --splitter-border-color: var(--demo-border-emphasized);
  --splitter-thumb-color: var(--demo-neutral-emphasized);
  --splitter-thumb-size: 0.5rem;
  --splitter-thumb-inset: calc(var(--splitter-thumb-size) * -0.5);
  --splitter-border-size: 1px;
  --splitter-handle-size: 1.5rem;

  display: flex;
  min-height: 20rem;
  border: 1px solid var(--demo-border);
  width: 100%;
}

.splitter-panel {
  align-items: center;
  color: var(--demo-neutral-fg);
  display: flex;
  font-weight: 500;
  justify-content: center;
  min-height: 0;
  min-width: 0;
}

.splitter-trigger {
  background: transparent;
  border: 0;
  cursor: col-resize;
  display: grid;
  justify-content: center;
  outline: 0;
  padding: 0;
  place-items: center;
  position: relative;
}

.splitter-trigger[data-orientation='horizontal'] {
  cursor: col-resize;
  margin-inline: var(--splitter-thumb-inset);
  min-width: var(--splitter-thumb-size);
}

.splitter-trigger[data-orientation='vertical'] {
  cursor: row-resize;
  margin-block: var(--splitter-thumb-inset);
  min-height: var(--splitter-thumb-size);
}

.splitter-trigger:focus,
.splitter-trigger[data-dragging] {
  --splitter-border-color: var(--demo-coral-emphasized);
  --splitter-thumb-color: var(--demo-coral-solid);
}

.splitter-trigger[data-disabled] {
  cursor: default;
}

.splitter-trigger::before {
  background: var(--splitter-border-color);
  content: '';
  position: absolute;
}

.splitter-trigger[data-orientation='horizontal']::before {
  inset-block: 0;
  inset-inline-end: calc(var(--splitter-thumb-size) * 0.5);
  inset-inline-start: auto;
  width: var(--splitter-border-size);
}

.splitter-trigger[data-orientation='vertical']::before {
  height: var(--splitter-border-size);
  inset-block-end: calc(var(--splitter-thumb-size) * 0.5);
  inset-block-start: auto;
  inset-inline: 0;
}

.splitter-indicator {
  background: var(--splitter-thumb-color);
  border: 1px solid var(--demo-border-emphasized);
  border-radius: 999px;
  box-shadow: var(--demo-shadow-sm);
  display: block;
  position: relative;
  z-index: 1;
}

.splitter-indicator[data-orientation='horizontal'] {
  height: var(--splitter-handle-size);
  width: var(--splitter-thumb-size);
}

.splitter-indicator[data-orientation='vertical'] {
  height: var(--splitter-thumb-size);
  width: var(--splitter-handle-size);
}

.splitter-indicator[data-focus]:focus-visible {
  outline: 2px solid var(--demo-coral-focus-ring);
  outline-offset: 2px;
}

.splitter-indicator[data-disabled] {
  visibility: hidden;
}

.splitter-button {
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
  cursor: pointer;
}

.splitter-button > svg {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
}

.splitter-button:has(> svg:only-child) {
  padding-inline: 0.625rem !important;
}

.splitter-button:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
  background: var(--demo-neutral-subtle);
}

.splitter-button:focus-visible {
  outline: 2px solid var(--demo-coral-focus-ring);
  outline-offset: -1px;
}

.splitter-button:is(:disabled, [data-disabled]) {
  opacity: 0.5;
  filter: grayscale(100%);
}

.splitter-button[data-variant='surface'] {
  border-color: var(--demo-border-emphasized);
  color: var(--demo-coral-fg);
}

.splitter-button[data-variant='solid'] {
  background: var(--demo-coral-solid);
  border-color: var(--demo-coral-solid);
  color: var(--demo-coral-contrast);
}

.splitter-button[data-variant='solid']:hover {
  background: var(--demo-coral-fg);
  border-color: var(--demo-coral-fg);
}

.splitter-button[data-variant='solid']:focus-visible {
  outline-offset: 2px;
}
`
