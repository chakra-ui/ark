export const dateInputExampleStyles = `
  [data-scope='date-input'][data-part='root'] {
    display: inline-grid;
    gap: 0.5rem;
  }

  [data-scope='date-input'][data-part='control'] {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  [data-scope='date-input'][data-part='segment-group'] {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
  }

  [data-scope='date-input'][data-part='segment'] {
    min-width: 1ch;
    outline: none;
  }

  [data-scope='date-input'][data-part='segment'][data-focus] {
    background: #dbeafe;
  }
`
