export const fileUploadExampleStyles = `
  [arkFileUpload],
  [arkFileUploadRootProvider] {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: inherit;
    font-size: 0.875rem;
    color: var(--demo-neutral-fg);
  }

  [arkFileUploadLabel] {
    font-weight: 500;
  }

  [arkFileUploadTrigger],
  [arkFileUploadClearTrigger],
  [arkFileUploadItemDeleteTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    font: inherit;
    background: var(--demo-neutral-subtle);
    color: inherit;
    border: 0;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  [arkFileUploadDropzone] {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--demo-border-emphasized);
    border-radius: 0.375rem;
    padding: 1rem;
    cursor: pointer;
  }

  [arkFileUploadDropzone][data-dragging] {
    background: var(--demo-neutral-subtle);
  }

  [arkFileUploadItemGroup] {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  [arkFileUploadItem] {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
  }
`
