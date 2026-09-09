---
'@ark-ui/solid': minor
---

Forward each part's state into the `render` function.

`render` received the props to spread but no state, so the second argument was always the frozen empty object. 137 parts
now pass the state their machine exposes, and each publishes the type to go with it.

**The state arrives as an accessor**, unlike the other frameworks:

```tsx
<Collapsible.Trigger render={(props, state) => <button {...props}>{state().open ? 'Open' : 'Closed'}</button>} />
```

Solid never re-executes a component body, so passing the state by value would freeze it at its initial value. An
accessor keeps it fine-grained: the text updates without recreating the element, which matters because recreating it
drops focus. `asChild` took a props accessor for the same reason.
