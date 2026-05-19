export const splitterExampleStyles = `
.stack {
  display: grid;
  gap: 0.75rem;
}

.splitter-root {
  --splitter-border-color: #a1a1aa;
  --splitter-thumb-color: #71717a;
  --splitter-thumb-size: 0.5rem;
  --splitter-thumb-inset: calc(var(--splitter-thumb-size) * -0.5);
  --splitter-border-size: 1px;
  --splitter-handle-size: 1.5rem;

  border: 1px solid #d4d4d8;
  display: flex;
  min-height: 20rem;
  min-width: 18rem;
  width: 100%;
}

.splitter-panel {
  align-items: center;
  color: #18181b;
  display: flex;
  font-weight: 600;
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
  --splitter-border-color: #e11d48;
  --splitter-thumb-color: #f43f5e;
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
  border: 1px solid #d4d4d8;
  border-radius: 999px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.12);
  display: block;
  position: relative;
  z-index: 1;
}

.splitter-indicator[data-orientation='horizontal'] {
  height: var(--splitter-handle-size);
  width: 100%;
}

.splitter-indicator[data-orientation='vertical'] {
  height: 100%;
  width: var(--splitter-handle-size);
}

.splitter-indicator[data-focus]:focus-visible {
  outline: 2px solid #f43f5e;
  outline-offset: 2px;
}

.splitter-indicator[data-disabled] {
  visibility: hidden;
}

.splitter-button {
  border: 1px solid #d4d4d8;
  border-radius: 0.375rem;
  background: #ffffff;
  color: #18181b;
  cursor: pointer;
  font: inherit;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
}
`
