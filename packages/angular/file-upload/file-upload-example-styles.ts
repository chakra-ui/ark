export const fileUploadExampleStyles = `
  [arkFileUpload],
  [arkFileUploadRootProvider] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    max-width: 24rem;
    font-family: inherit;
  }

  [arkFileUploadLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  [arkFileUploadLabel][data-disabled] {
    opacity: 0.5;
  }

  [arkFileUploadTrigger],
  [arkFileUploadClearTrigger] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  [arkFileUploadTrigger] {
    padding-inline: 1rem;
    padding-block: 0.5rem;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
  }

  [arkFileUploadClearTrigger] {
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: 0;
    border-radius: 0.375rem;
    color: var(--demo-neutral-emphasized);
  }

  [arkFileUploadTrigger] svg,
  [arkFileUploadClearTrigger] svg {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }

  [arkFileUploadClearTrigger] svg {
    width: 0.85em;
    height: 0.85em;
  }

  [arkFileUploadTrigger]:hover:not(:disabled, [data-disabled]),
  [arkFileUploadClearTrigger]:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  [arkFileUploadClearTrigger]:hover:not(:disabled, [data-disabled]) {
    color: var(--demo-neutral-fg);
  }

  [arkFileUploadTrigger]:focus-visible,
  [arkFileUploadClearTrigger]:focus-visible,
  [arkFileUploadItemDeleteTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  [arkFileUploadTrigger]:is(:disabled, [data-disabled]),
  [arkFileUploadClearTrigger]:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkFileUploadDropzone] {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-height: 10rem;
    padding: 1.5rem;
    border: 2px dashed var(--demo-border-emphasized);
    border-radius: 0.5rem;
    text-align: center;
    cursor: pointer;
    transition:
      background 150ms,
      border-color 150ms;
  }

  [arkFileUploadDropzone]:hover:not([data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  [arkFileUploadDropzone][data-dragging] {
    background: var(--demo-coral-subtle);
    border-color: var(--demo-coral-solid);
    border-style: solid;
  }

  [arkFileUploadDropzone][data-invalid] {
    border-color: var(--demo-error);
  }

  [arkFileUploadDropzone][data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [arkFileUploadDropzone]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  [arkFileUploadItemGroup] {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  [arkFileUploadItem] {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      'preview name delete'
      'preview size delete';
    align-items: center;
    column-gap: 0.75rem;
    padding: 0.75rem;
    background: var(--demo-bg-popover);
    border: 1px solid var(--demo-border);
    border-radius: 0.5rem;
  }

  [arkFileUploadItem].compact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: var(--demo-neutral-subtle);
    border: 0;
    border-radius: 0.375rem;
  }

  [arkFileUploadItem][data-rejected] {
    background: var(--demo-coral-subtle);
    border-color: var(--demo-coral-fg);
  }

  [arkFileUploadItemPreview],
  .item-preview {
    grid-area: preview;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  [arkFileUploadItemPreview] svg,
  .item-preview svg {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--demo-neutral-emphasized);
  }

  [arkFileUploadItemPreviewImage] {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  [arkFileUploadItemName] {
    grid-area: name;
    flex: 1;
    min-width: 0;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [arkFileUploadItemSizeText] {
    grid-area: size;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--demo-neutral-emphasized);
  }

  [arkFileUploadItemDeleteTrigger] {
    grid-area: delete;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    background: transparent;
    border: 0;
    border-radius: 0.25rem;
    color: var(--demo-neutral-emphasized);
    cursor: pointer;
  }

  [arkFileUploadItemDeleteTrigger]:hover {
    color: var(--demo-neutral-fg);
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .dropzone-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .dropzone-icon {
    display: inline-flex;
    width: 2.5rem;
    height: 2.5rem;
    color: var(--demo-neutral-emphasized);
  }

  .dropzone-icon svg {
    width: 100%;
    height: 100%;
  }

  .dropzone-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  .dropzone-description {
    font-size: 0.75rem;
    color: var(--demo-neutral-fg-muted);
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-self: stretch;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: var(--demo-neutral-emphasized);
  }

  .status-icon {
    display: inline-flex;
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 0.25rem;
    vertical-align: middle;
  }

  .status-icon svg {
    width: 100%;
    height: 100%;
  }

  .section-title[data-status='accepted'] {
    color: #16a34a;
  }

  .section-title[data-status='rejected'],
  .error-item {
    color: var(--demo-coral-fg);
  }

  .error-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    grid-column: 2 / -1;
    margin-top: 0.25rem;
  }

  .error-item {
    font-size: 0.75rem;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .demo-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    padding-inline: 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--demo-neutral-fg);
    white-space: nowrap;
    user-select: none;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .demo-button:hover:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  .demo-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  .demo-button[data-variant='solid'] {
    background: var(--demo-coral-solid);
    border-color: var(--demo-coral-solid);
    color: var(--demo-coral-contrast);
  }

  .demo-button[data-variant='solid']:hover {
    background: var(--demo-coral-fg);
    border-color: var(--demo-coral-fg);
  }

  [arkFieldRoot] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
    width: 100%;
    max-width: 24rem;
    font-family: inherit;
  }

  [arkFieldHelperText],
  [arkFieldErrorText] {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  [arkFieldHelperText] {
    color: var(--demo-neutral-fg-muted);
  }

  [arkFieldErrorText] {
    color: var(--demo-coral-fg);
  }

  .field-textarea {
    width: 100%;
    min-width: 0;
    min-height: 5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-family: inherit;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
    outline: none;
    resize: vertical;
    scroll-padding-bottom: 0.5rem;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  .field-textarea::placeholder {
    color: var(--demo-neutral-emphasized);
  }

  .field-textarea:focus {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }
`
