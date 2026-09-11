# asChild → render

`asChild` is replaced by `render` in v6. `render` is explicit about which element is being replaced, and it hands you
the part's state as well as its props — so an indicator can render from what the machine knows instead of from a CSS
attribute selector.

There is one transform per framework, because the shape of the change differs. React and Vue are structural: the child
element moves into a prop or a slot. Solid and Svelte already took a callback, so they are renames with a signature
change.

## React

`asChild` was a boolean and the replaced element was the single child. `render` takes the element directly.

```sh
npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx" --dry
```

```diff
- <Popover.Trigger asChild>
-   <button>Open Popover</button>
- </Popover.Trigger>
+ <Popover.Trigger render={<button>Open Popover</button>} />
```

The part's own props are kept:

```diff
- <Menu.Item asChild value="x" className="y">
-   <a href="#">Go</a>
- </Menu.Item>
+ <Menu.Item value="x" className="y" render={<a href="#">Go</a>} />
```

**Left for you:** a part with more than one child, and `asChild={someCondition}`. Both need a decision the codemod
should not make. For a conditional, the equivalent is usually a function:

```tsx
<Menu.Item render={cond ? (props) => <a {...props} /> : undefined}>Go</Menu.Item>
```

## Solid

`asChild` already took a callback, but it received a props **accessor**. `render` receives the props directly, so the
call goes.

```sh
npx @ark-ui/codemod solid/as-child-to-render "src/**/*.tsx" --dry
```

```diff
- <Popover.Trigger asChild={(props) => <button {...props()} />}>Open</Popover.Trigger>
+ <Popover.Trigger render={(props) => <button {...props} />}>Open</Popover.Trigger>
```

Only `props()` — a zero-argument call on the callback's own parameter — is unwrapped. An unrelated call keeping the same
name is untouched.

`render` also passes the part's state as a second argument, which existing call sites simply do not declare:

```tsx
<Switch.Thumb render={(props, state) => <span {...props}>{state.checked ? '✓' : ''}</span>} />
```

## Vue

`asChild` was a boolean; `render` is a scoped slot, and the slot body has to bind the props it is given.

```sh
npx @ark-ui/codemod vue/as-child-to-render "src/**/*.vue" --dry
```

```diff
- <Popover.Trigger asChild>
-   <button>Open Popover</button>
- </Popover.Trigger>
+ <Popover.Trigger #render="{ props }">
+   <button v-bind="props">Open Popover</button>
+ </Popover.Trigger>
```

Both `asChild` and `as-child` are recognised.

You do not need `mergeProps`. Vue merges classes and stacks handlers on `v-bind`, so your own `class` and `@click`
alongside `v-bind="props"` both survive.

`#render` goes directly on the part. The `<template>` wrapper is only needed when you pass another slot alongside it.

**Left for you:** a child that already binds props, since merging two bindings is a judgement call.

## Svelte

`asChild` was a snippet receiving a props function, and `render` receives the same. This is a rename.

```sh
npx @ark-ui/codemod svelte/as-child-to-render "src/**/*.svelte" --dry
```

```diff
- {#snippet asChild(props)}
+ {#snippet render(props)}
    <button {...props()}>Open Popover</button>
  {/snippet}
```

`props` stays a function — keep `{...props()}`.

`render` takes the part's state as a second parameter:

```svelte
{#snippet render(props, state)}
  <button {...props()}>{state.open ? 'Open' : 'Closed'}</button>
{/snippet}
```

**Left for you:** a bare `asChild` attribute with no snippet, which has nowhere to receive the props and needs one
written by hand.

## After the codemod

`asChild` still works in v6 and is marked deprecated, so a partial migration is not a broken one. Run `--dry` first,
land the mechanical part, then work through whatever the summary lists.
