---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add the `Menubar` component, an application-style menu bar that coordinates a row of `Menu`s.

`Menubar.Root` owns roving tabindex, arrow/Home/End navigation and typeahead across the triggers, and hands each
top-level `Menu` the config it needs to behave as a menubar menu. Menus read that from context, so no extra prop or
wrapper is involved:

```tsx
<Menubar.Root>
  <Menu.Root>
    <Menu.Trigger>File</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>{/* ... */}</Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
  {/* more menus */}
</Menubar.Root>
```

Menus must be portalled. The menubar treats every `[role=menuitem]` inside its root as one of its own items, so content
rendered inline would be picked up as a trigger.

Once one menu is open, arrowing or hovering to a sibling switches to it. Both the outgoing and incoming content get
`data-instant` for that swap, so styles can skip the open/close animation while only the first open animates:

```css
.Content[data-instant] {
  animation: none;
}
```

Nested submenus work as usual via `Menu.TriggerItem`, and a `Menu.Trigger` marked `disabled` is skipped by keyboard
navigation and does not open on hover.

`Menu.Root` and `useMenu` no longer accept a `menubar` prop. It was only ever meant to be supplied by a parent menubar,
and is now always read from `Menubar.Root`'s context.
