---
'@ark-ui/solid': minor
---

Give the `render` function the part's state, and a props function that merges.

`render` received the props to spread but no state, so the second argument was always the frozen empty object. Every
part whose machine exposes a state getter now forwards it.

`render` also took a plain props object, so a caller adding its own handler silently replaced the part's — a trigger
with `onClick` stopped toggling, with no warning. `props` is now the same merge function `asChild` takes: call it to get
the part's props, passing your own to merge rather than overwrite them.

```tsx
<Collapsible.Trigger render={(props, state) => <button {...props()}>{state().open ? 'Open' : 'Closed'}</button>} />

<Collapsible.Trigger render={(props) => <button {...props({ class: 'mine', onClick: mine })} />} />
```

Migrating from `asChild` is now a rename, and `{...props}` becomes `{...props()}`. The state arrives as an accessor
because Solid never re-executes a component body, so a by-value state would freeze at its initial value.
