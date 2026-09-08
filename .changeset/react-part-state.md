---
'@ark-ui/react': minor
---

Forward each part's state into the `render` function.

`render={(props, state) => ...}` had no state source outside the factory's own tests — every part passed `props` but
nothing passed `state`. 137 parts now pass the state their machine exposes, and each one publishes the type to go with
it:

```tsx
<Collapsible.Trigger render={(props, state) => <button {...props}>{state.open ? 'Open' : 'Closed'}</button>} />
```

`ToastRoot` also rendered a plain `div` while declaring `PolymorphicProps`, so `render` and `asChild` were silently
ignored there. It renders `ark.div` now.
