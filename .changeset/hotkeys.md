---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add a `hotkeys` entrypoint with hooks for registering and inspecting keyboard shortcuts, built on `@zag-js/hotkeys`.

- `useHotkey({ hotkey, action })` and `useHotkeys({ commands })` register commands. `mod+K` resolves per platform, and
  `G > H` sequences go through the same hook rather than a separate one. Command ids are optional, and generated when
  omitted.
- `useHotkeyRegistrations` returns the registered commands with their metadata (`label`, `description`, `category`,
  `keywords`), so a command palette or shortcut dialog can render from the same registration that binds the key.
- `usePressedKeys` and `useIsKeyPressed` track live key state.
- `useHotkeyRecorder` records a chord or a sequence for rebinding UIs.
- `usePlatform` and `useFormatHotkey` render shortcuts for the current platform without a hydration mismatch.
- `createHotkeyStore` builds an isolated store. Pass it to any hook as `store` to scope a set of commands, which is what
  a command palette wants so `useHotkeyRegistrations` returns only its own. Active scopes, conflict behavior, sequence
  timeout and default options are configured on the store. Without one, hooks share a default store.
