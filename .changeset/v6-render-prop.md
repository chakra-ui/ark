---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add `render` as the way to compose a part with your own element, and deprecate `asChild`.

`render` is explicit about which element is being replaced, and it hands you the part's state as well as its props,
so an indicator can render from what the machine knows rather than from a CSS attribute selector. Each framework
spells it the way that framework composes: a prop in React and Solid, a slot in Vue, a snippet in Svelte.

```diff
- <Popover.Trigger asChild>
-   <MyButton>Open</MyButton>
- </Popover.Trigger>
+ <Popover.Trigger render={<MyButton>Open</MyButton>} />
```

`asChild` still works and is marked deprecated. It will be removed in the next major.
