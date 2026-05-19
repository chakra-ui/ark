export const splitterExampleStyles = `
.stack {
  display: grid;
  gap: 0.75rem;
}

.splitter-root {
  border: 1px solid #d4d4d8;
  height: 12rem;
  min-width: 18rem;
}

.splitter-panel {
  align-items: center;
  background: #f8fafc;
  color: #18181b;
  display: flex;
  font-weight: 600;
  justify-content: center;
  min-height: 0;
  min-width: 0;
}

.splitter-trigger {
  align-items: center;
  background: #e4e4e7;
  border: 0;
  display: flex;
  justify-content: center;
  padding: 0;
}

.splitter-trigger[data-orientation='horizontal'] {
  width: 0.5rem;
}

.splitter-trigger[data-orientation='vertical'] {
  height: 0.5rem;
}

.splitter-indicator {
  background: #71717a;
  border-radius: 999px;
  display: block;
}

.splitter-indicator[data-orientation='horizontal'] {
  height: 2rem;
  width: 0.125rem;
}

.splitter-indicator[data-orientation='vertical'] {
  height: 0.125rem;
  width: 2rem;
}
`
