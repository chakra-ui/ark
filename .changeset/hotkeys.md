---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add a `hotkeys` entrypoint with hooks for registering and inspecting keyboard shortcuts, built on `@zag-js/hotkeys`.

- `useHotkey` and `useHotkeys` register commands. `mod+K` resolves per platform, and `G > H` sequences are handled by
  the same hook rather than a separate one.
- `useHotkeyRegistrations` returns the registered commands with their metadata (`label`, `description`, `category`,
  `keywords`), so a command palette or shortcut dialog can render from the same registration that binds the key.
- `usePressedKeys` and `useIsKeyPressed` track live key state.
- `useHotkeyRecorder` records a chord or a sequence for rebinding UIs.
- `usePlatform` and `useFormatHotkey` render shortcuts for the current platform without a hydration mismatch.
- `HotkeysProvider` shares one store and sets default options, active scopes, conflict behavior, and sequence timeout.
