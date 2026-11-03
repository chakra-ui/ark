---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add `Menu.Input` and `Menu.List` for filterable menus. Filter the items yourself, for example with `useFilter` and
`useListCollection`, and the input keeps focus while the arrow keys move the highlight through the list.

```tsx
<Menu.Root composite={false}>
  <Menu.Trigger>Actions</Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Input value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
      <Menu.List>{/* filtered items */}</Menu.List>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
```

Set `composite={false}` so the popup is a dialog holding the input and the `menu` list. `autoHighlight` on
`Menu.Root` highlights the first match as the query changes, or always with `"always"`. Submenus can have their own
input, and Escape or the left arrow on an empty input returns to the parent's.
