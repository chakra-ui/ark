---
'@ark-ui/solid': minor
---

Forward each part's state into the `render` function.

`render` received the props to spread but no state, so the second argument was always the frozen empty object. Every
part whose machine exposes a state getter now forwards it.

**The state arrives as an accessor**, unlike the other frameworks:

```tsx
<Collapsible.Trigger render={(props, state) => <button {...props}>{state().open ? 'Open' : 'Closed'}</button>} />
```

Solid never re-executes a component body, so a by-value state would freeze at its initial value.
