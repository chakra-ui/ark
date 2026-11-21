---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add the `Command` component for command palettes and quick switchers. Focus stays in the input while the arrow keys move
the highlight, and Enter or a click calls `onSelect`.

```tsx
<Command.Root collection={collection} onSelect={(details) => run(details.itemValue)}>
  <Command.Label>Commands</Command.Label>
  <Command.Control>
    <Command.Input placeholder="Type a command or search..." />
  </Command.Control>
  <Command.Context>
    {(command) => (
      <Command.List>
        {command.collection.items.map((item) => (
          <Command.Item key={item.value} item={item}>
            <Command.ItemText>{item.label}</Command.ItemText>
          </Command.Item>
        ))}
      </Command.List>
    )}
  </Command.Context>
  <Command.Empty>No results found</Command.Empty>
</Command.Root>
```

Items are fuzzy-matched on their text and `keywords`; pass `filter` to replace it. Build the collection with the new
`createPageListCollection` for nested pages: an item's `parent` puts it on that item's page, and Backspace goes up.
