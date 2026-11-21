---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add the `Command` component, a searchable list of actions for command palettes and quick switchers. Typing filters the
items, the arrow keys, Home, and End move the highlight while focus stays in the input, and Enter or a click calls
`onSelect`. Render it inline or inside a `Dialog`.

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

Items match on their text and on an optional `keywords` array; pass `filter` to match your own way. Items with a
`parent` value form nested pages: selecting the parent opens its page, and Backspace in an empty input goes back.
