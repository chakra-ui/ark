---
'@ark-ui/svelte': minor
---

Forward each part's state into the `render` snippet.

`render` received the props to bind but no state, so the second parameter was always the frozen empty object. 124 parts
now pass the state their machine exposes, and each declares the type to go with it:

```svelte
<Collapsible.Trigger>
  {#snippet render(props, state)}
    <button {...props()}>{state.open ? 'Open' : 'Closed'}</button>
  {/snippet}
</Collapsible.Trigger>
```
