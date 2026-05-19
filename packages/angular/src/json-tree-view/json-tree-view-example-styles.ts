export const jsonTreeViewExampleStyles = `
  [arkJsonTreeView],
  [arkJsonTreeViewRootProvider] {
    display: grid;
    gap: 0.5rem;
    max-width: 36rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    line-height: 1.7;
  }

  [arkJsonTreeViewTree] {
    display: grid;
    gap: 0.125rem;
  }

  [data-part='branch-control'],
  [data-part='item'] {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding-inline-start: calc(var(--line-length, 0) * 1rem);
  }

  [data-part='branch-indicator'] {
    display: inline-grid;
    width: 1rem;
    place-items: center;
  }

  [data-part='branch-indicator'][data-state='open'] {
    rotate: 90deg;
  }

  [data-kind='key'] {
    color: #6f3cc3;
  }

  [data-kind='colon'],
  [data-kind='brace'],
  [data-kind='operator'] {
    color: #687076;
  }

  [data-type='string'] {
    color: #0b7285;
  }

  [data-type='number'],
  [data-type='boolean'],
  [data-type='null'] {
    color: #b45309;
  }
`
