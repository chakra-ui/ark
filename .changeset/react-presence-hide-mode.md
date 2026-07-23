---
'@ark-ui/react': minor
---

Added `hideMode` (`'display-none' | 'activity'`) for how kept-mounted content is hidden when closed. Covers
presence-based overlays and Collapsible (including Accordion and TreeView).

- `'display-none'` (default): HTML `hidden`. Effects stay alive.
- `'activity'`: React 19 [`Activity`](https://react.dev/reference/react/Activity). Effects pause.

Applies while content stays mounted:

```jsx
// applies from the start
<Dialog.Root hideMode="activity" />

// applies after the first open (lazyMount only delays the first mount)
<Dialog.Root lazyMount hideMode="activity" />

<Collapsible.Root hideMode="activity" />
<Accordion.Root hideMode="activity" />
```

Does not apply when content is unmounted:

```jsx
// unmountOnExit removes the tree on close, so hideMode never runs
<Dialog.Root lazyMount unmountOnExit hideMode="activity" />
```
