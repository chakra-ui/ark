export const avatarExampleStyles = `
  [arkAvatar],
  [arkAvatarRootProvider] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    position: relative;
    vertical-align: top;
    flex-shrink: 0;
    user-select: none;
    border-radius: 9999px;
    background: var(--demo-neutral-subtle);
    color: var(--demo-neutral-fg);
    font-size: 1rem;
    width: 3rem;
    height: 3rem;
  }

  [arkAvatarImage] {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  [arkAvatarFallback] {
    border-radius: inherit;
    line-height: 1;
    text-transform: uppercase;
    font-weight: 500;
    font-size: inherit;
  }

  .avatar-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-inline: 1rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    border: 1px solid var(--demo-border-emphasized);
    border-radius: 0.375rem;
    background: transparent;
    color: var(--demo-neutral-fg);
    white-space: nowrap;
    user-select: none;
    transition:
      background 150ms,
      border-color 150ms,
      color 150ms;
  }

  .avatar-button:hover {
    background: var(--demo-neutral-subtle);
  }

  .avatar-button:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }
`
