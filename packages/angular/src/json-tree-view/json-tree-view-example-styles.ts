export const jsonTreeViewExampleStyles = `
  [arkJsonTreeView],
  [arkJsonTreeViewRootProvider] {
    width: 100%;
    color: var(--demo-neutral-fg);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  [arkJsonTreeViewTree] {
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    line-height: 1.8;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  [data-part='branch-content'] {
    position: relative;
  }

  [data-part='branch-indent-guide'] {
    height: 100%;
    width: 1px;
    background: var(--demo-border);
    position: absolute;
    inset-inline-start: calc((var(--depth) - 1) * 1rem);
  }

  [data-part='branch-indent-guide'][data-depth='1'] {
    inset-inline-start: 0.75rem;
  }

  [data-part='branch-control'],
  [data-part='item'] {
    display: flex;
    position: relative;
    user-select: none;
  }

  [data-part='branch-control'] {
    padding-inline-start: calc((var(--depth) - 1) * 0.75rem);
  }

  [data-part='branch-control'][data-depth='1'] {
    padding-inline-start: 0.25rem;
  }

  [data-part='item'] {
    padding-inline-start: calc(((var(--depth) - 1) * 0.75rem) + 0.75rem);
  }

  [data-part='item'][data-depth='1'] {
    padding-inline-start: 1.5rem;
  }

  [data-part='branch-control']:hover,
  [data-part='item']:hover {
    background: var(--demo-neutral-subtle);
  }

  [data-part='branch-indicator'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-inline-end: 0.25rem;
    transform-origin: center;
  }

  [arkJsonTreeViewTree] svg {
    width: 1rem;
    height: 1rem;
  }

  [data-part='branch-indicator'][data-state='open'] {
    transform: rotate(90deg);
  }

  [data-part='item-text'],
  [data-part='branch-text'] {
    display: flex;
    align-items: baseline;
  }

  [data-kind='key'] {
    color: var(--demo-json-key);
    font-weight: 500;
  }

  [data-kind='colon'] {
    color: var(--demo-neutral-emphasized);
    margin-inline: 0.25rem;
  }

  [data-kind='brace'] {
    color: var(--demo-neutral-fg);
    font-weight: 700;
  }

  [data-kind='preview-text'] {
    color: var(--demo-neutral-emphasized);
    font-style: italic;
  }

  [data-kind='constructor'] {
    color: var(--demo-json-accent);
    font-weight: 500;
  }

  [data-type='string'] {
    color: var(--demo-json-string);
  }

  [data-type='number'] {
    color: var(--demo-json-number);
  }

  [data-type='boolean'],
  [data-type='function'] {
    color: var(--demo-json-boolean);
  }

  [data-type='boolean'],
  [data-type='null'],
  [data-type='undefined'] {
    font-weight: 600;
  }

  [data-type='null'],
  [data-type='undefined'] {
    color: var(--demo-neutral-emphasized);
    font-style: italic;
  }

  [data-type='function'] {
    font-style: italic;
  }

  [data-type='date'] {
    color: var(--demo-json-number);
  }

  [data-type='error'] {
    color: var(--demo-json-string);
    font-weight: 500;
  }

  [data-type='regex'] {
    color: var(--demo-json-accent);
  }
`
