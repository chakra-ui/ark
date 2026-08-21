---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

**Hotkeys** [New]: Add a `hotkeys` entrypoint with hooks for registering and inspecting keyboard shortcuts, built on
`@zag-js/hotkeys`.

`useHotkey` registers one command. `useHotkeys` registers several. `mod+K` resolves per platform, and sequences like
`G > H` go through the same hook. Command ids are optional and generated when omitted.

```tsx
useHotkey({ hotkey: 'mod+K', action: openSearch })

useHotkeys({
  commands: [
    { hotkey: 'mod+S', action: save, label: 'Save', category: 'File' },
    { hotkey: 'G > H', action: goHome, label: 'Home' },
  ],
})
```

`useHotkeyRegistrations` returns those commands with their metadata (`label`, `description`, `category`, `keywords`), so
a command palette or shortcut dialog can render from the same registration that binds the key. Pass a store from
`createHotkeyStore` to scope a set of commands. Without one, hooks share a default store.

```tsx
const store = createHotkeyStore()

useHotkeys({ commands, store })
const registered = useHotkeyRegistrations({ store })
```

Active scopes, conflict behavior, sequence timeout, and default options are configured on the store. `usePressedKeys`
and `useIsKeyPressed` track live key state. `useHotkeyRecorder` records a chord or sequence for rebinding UIs.
`usePlatform` and `useFormatHotkey` render shortcuts for the current platform without a hydration mismatch.
