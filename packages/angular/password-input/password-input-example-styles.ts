export const passwordInputExampleStyles = `
  :host {
    display: block;
    color: var(--demo-neutral-fg);
  }

  .stack {
    display: grid;
    gap: 0.75rem;
  }

  [arkPasswordInputRoot], [arkPasswordInputRootProvider] {
    color: var(--demo-neutral-fg);
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
    max-width: 20rem;
  }

  [arkPasswordInputRoot][data-disabled],
  [arkPasswordInputRootProvider][data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  [arkPasswordInputLabel] {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--demo-neutral-fg);
  }

  [arkPasswordInputControl] {
    position: relative;
    display: flex;
    align-items: center;
  }

  [arkPasswordInputInput] {
    width: 100%;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    padding-right: 2.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: transparent;
    border: 1px solid var(--demo-border-emphasized, #d1d5db);
    border-radius: 0.375rem;
    color: var(--demo-neutral-fg);
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  [arkPasswordInputInput]::placeholder {
    color: var(--demo-neutral-emphasized);
  }

  [arkPasswordInputInput]:focus {
    border-color: var(--demo-coral-solid);
    box-shadow: 0 0 0 1px var(--demo-coral-solid);
  }

  [arkPasswordInputInput][data-invalid] {
    border-color: var(--demo-coral-fg, var(--demo-error));
  }

  [arkPasswordInputInput][data-invalid]:focus {
    border-color: var(--demo-coral-fg, var(--demo-error));
    box-shadow: 0 0 0 1px var(--demo-coral-fg, var(--demo-error));
  }

  [arkPasswordInputVisibilityTrigger] {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    background: transparent;
    border: none;
    border-radius: 0.25rem;
    color: var(--demo-neutral-emphasized);
    cursor: pointer;
    transition: color 0.15s ease;
  }

  [arkPasswordInputVisibilityTrigger]:hover {
    color: var(--demo-neutral-fg);
  }

  [arkPasswordInputVisibilityTrigger]:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: 2px;
  }

  [arkPasswordInputVisibilityTrigger] svg {
    width: 1rem;
    height: 1rem;
  }

  [arkPasswordInputIndicator] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .strength-meter {
    margin-top: 0.5rem;
  }

  .strength-bar {
    height: 0.5rem;
    background: var(--demo-neutral-subtle);
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .strength-fill {
    height: 100%;
    transition: width 0.2s ease;
  }

  .strength-fill[data-strength='weak'] {
    background: var(--demo-error);
    width: 30%;
  }

  .strength-fill[data-strength='medium'] {
    background: orange;
    width: 60%;
  }

  .strength-fill[data-strength='strong'] {
    background: green;
    width: 100%;
  }

  .strength-label {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    text-transform: capitalize;
    color: var(--demo-neutral-emphasized);
  }

  .validation-message {
    margin-top: 0.25rem;
    font-size: 0.875rem;
  }

  .validation-message[data-valid='true'] {
    color: green;
  }

  .validation-message[data-valid='false'] {
    color: var(--demo-error);
  }
`
