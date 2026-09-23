---
'@ark-ui/svelte': patch
---

Fix composing one part inside another part's `render` snippet.

The props function was typed as returning Svelte's `HTMLAttributes`, whose `id` is `string | null`. Ark parts take
`string | undefined`, so spreading the props into a part did not typecheck:

```svelte
<Tooltip.Trigger>
  {#snippet render(props)}
    <Checkbox.Root {...props({ class: styles.Root })}>
```

The factory merges the machine's props, where `id` is always a string, so the nullable type was never accurate.
