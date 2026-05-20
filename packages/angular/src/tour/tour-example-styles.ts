export const tourExampleStyles = `
  .tour-root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    max-width: 24rem;
  }

  .tour-targets {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tour-target {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    border: 1px solid var(--demo-border-emphasized, #a1a1aa);
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #18181b);
    background: var(--demo-bg-popover, #fff);
  }

  .tour-backdrop {
    --z-index: 2;
    background-color: rgb(0 0 0 / 0.5);
    z-index: var(--z-index);
  }

  .tour-spotlight {
    border-radius: 4px;
  }

  .tour-positioner {
    z-index: var(--z-index, 40);
  }

  .tour-positioner[data-type="dialog"] {
    width: 100%;
    position: fixed;
    inset: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tour-positioner[data-type="floating"] {
    position: fixed;
  }

  .tour-positioner[data-type="floating"][data-placement*="bottom"] {
    bottom: 24px;
  }

  .tour-positioner[data-type="floating"][data-placement*="top"] {
    top: 24px;
  }

  .tour-positioner[data-type="floating"][data-placement*="end"] {
    inset-inline-end: 24px;
  }

  .tour-positioner[data-type="floating"][data-placement*="start"] {
    inset-inline-start: 24px;
  }

  .tour-content {
    --arrow-background: var(--demo-bg-popover, #fff);
    --arrow-size: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    outline: 0;
    padding: 20px;
    width: 320px;
    max-width: calc(100vw - 2rem);
    background: var(--demo-bg-popover, #fff);
    border: 1px solid var(--demo-border, #d4d4d8);
    border-radius: 6px;
    position: relative;
    filter: drop-shadow(0 4px 12px rgb(0 0 0 / 0.15));
    z-index: var(--demo-popover-z-index, 50);
  }

  .tour-content[data-state="open"] {
    animation: tour-scale-fade-in 0.15s ease-in-out;
  }

  .tour-content[data-state="closed"] {
    animation: tour-scale-fade-out 0.1s ease-in-out;
  }

  .tour-content[data-type="dialog"] {
    width: 400px;
  }

  .tour-content[data-type="floating"] {
    width: 360px;
  }

  .tour-arrow {
    --arrow-background: var(--demo-bg-popover, #fff);
    --arrow-shadow-color: var(--demo-border, #d4d4d8);
  }

  .tour-arrow-tip {
    border-top: 1px solid var(--demo-border, #d4d4d8);
    border-left: 1px solid var(--demo-border, #d4d4d8);
  }

  .tour-title {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--demo-neutral-fg, #18181b);
  }

  .tour-description {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: var(--demo-neutral-fg-muted, #52525b);
  }

  .tour-progress-text {
    font-size: 13px;
    color: var(--demo-neutral-emphasized, #3f3f46);
    opacity: 0.8;
  }

  .tour-close-trigger {
    position: absolute;
    top: 8px;
    right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: var(--demo-neutral-emphasized, #3f3f46);
    background: transparent;
    border-radius: 4px;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }

  .tour-close-trigger:hover {
    background: var(--demo-neutral-subtle, #f4f4f5);
  }

  .tour-close-trigger:focus-visible,
  .tour-action-trigger:focus-visible,
  .tour-button:focus-visible,
  .tour-input:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring, #fb7185);
    outline-offset: -1px;
  }

  .tour-control {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
  }

  .tour-button {
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
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, #a1a1aa);
    color: var(--demo-neutral-fg, #18181b);
  }

  .tour-button:hover:not(:disabled, [data-disabled]),
  .tour-button[aria-expanded="true"]:not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle, #f4f4f5);
  }

  .tour-button:disabled,
  .tour-button[data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .tour-button[data-variant="surface"] {
    border-color: var(--demo-border-emphasized, #a1a1aa);
    color: var(--demo-coral-fg, #be123c);
  }

  .tour-button[data-variant="solid"] {
    background: var(--demo-coral-solid, #e11d48);
    border-color: var(--demo-coral-solid, #e11d48);
    color: var(--demo-coral-contrast, #fff);
  }

  .tour-button[data-variant="solid"]:hover:not(:disabled) {
    background: var(--demo-coral-fg, #be123c);
    border-color: var(--demo-coral-fg, #be123c);
  }

  .tour-button[data-variant="solid"]:focus-visible {
    outline-offset: 2px;
  }

  .tour-action-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 0.875rem;
    padding-block: 0.375rem;
    font-size: 0.8125rem;
    font-weight: 500;
    font-family: inherit;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, #a1a1aa);
    color: var(--demo-neutral-fg, #18181b);
  }

  .tour-action-trigger:hover:not(:disabled) {
    background: var(--demo-neutral-subtle, #f4f4f5);
  }

  .tour-action-trigger:last-child {
    background: var(--demo-coral-solid, #e11d48);
    border-color: var(--demo-coral-solid, #e11d48);
    color: var(--demo-coral-contrast, #fff);
  }

  .tour-action-trigger:last-child:hover:not(:disabled) {
    background: var(--demo-coral-fg, #be123c);
    border-color: var(--demo-coral-fg, #be123c);
  }

  .tour-hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized, #3f3f46);
  }

  .tour-progress-bar {
    width: 100%;
    height: 4px;
    background: var(--demo-neutral-subtle, #f4f4f5);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .tour-progress-fill {
    height: 100%;
    background: var(--demo-coral-solid, #e11d48);
    transition: width 200ms ease-out;
  }

  .tour-progress-bar-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--demo-neutral-subtle, #f4f4f5);
    border-radius: 0 0 6px 6px;
    overflow: hidden;
  }

  .tour-event-log {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    border: 1px solid var(--demo-border, #d4d4d8);
    border-radius: 0.375rem;
    font-size: 0.8125rem;
    font-family: monospace;
    background: var(--demo-neutral-subtle, #f4f4f5);
    height: 120px;
    overflow-y: auto;
  }

  .tour-event-log-item {
    color: var(--demo-neutral-emphasized, #3f3f46);
  }

  .tour-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #d4d4d8;
    border-radius: 0.5rem;
    background: var(--demo-bg-popover, #fff);
    max-width: 320px;
  }

  .tour-form-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .tour-form-field label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--demo-neutral-fg, #18181b);
  }

  .tour-form-field-inline {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tour-form-field-inline label {
    font-size: 0.875rem;
    color: var(--demo-neutral-emphasized, #3f3f46);
  }

  .tour-input {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--demo-border-emphasized, #a1a1aa);
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background: var(--demo-bg, #fff);
    color: var(--demo-neutral-fg, #18181b);
  }

  .tour-input::placeholder {
    color: var(--demo-neutral-emphasized, #3f3f46);
    opacity: 0.6;
  }

  .tour-checkbox {
    width: 1rem;
    height: 1rem;
    accent-color: var(--demo-coral-solid, #e11d48);
  }

  .tour-list {
    align-self: stretch;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }

  .tour-list-item {
    padding: 0.75rem 1rem;
    border: 1px solid var(--demo-border, #d4d4d8);
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: var(--demo-neutral-fg, #18181b);
    background: var(--demo-bg-popover, #fff);
  }

  .tour-list-item[data-item="new"] {
    border-color: var(--demo-coral-solid, #e11d48);
    background: var(--demo-coral-subtle, #fff1f2);
  }

  @keyframes tour-scale-fade-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes tour-scale-fade-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.96);
    }
  }
`
