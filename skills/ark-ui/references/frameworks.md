# Frameworks

The parts and props are the same everywhere. What differs is how you pass your own element, read state, bind values and
portal overlays.

|                | React                                | Solid                        | Vue                    | Svelte                                | Web                                |
| -------------- | ------------------------------------ | ---------------------------- | ---------------------- | ------------------------------------- | ---------------------------------- |
| Package        | `@ark-ui/react`                      | `@ark-ui/solid`              | `@ark-ui/vue`          | `@ark-ui/svelte`                      | `@ark-ui/web`                      |
| Your element   | `render` prop                        | `render` prop                | `#render` slot         | `render` snippet                      | wrap a native child, or `as-child` |
| `render` props | object, spread it                    | function, spread `props()`   | object, `v-bind` it    | function, spread `props()`            | none                               |
| `render` state | object                               | accessor, `state()`          | object                 | object                                | `el.state`                         |
| Bind a value   | `value` + `onValueChange`            | `value` + `onValueChange`    | `v-model`              | `bind:value`                          | `value` attribute + `valuechange`  |
| Portal         | `Portal` from `@ark-ui/react/portal` | `Portal` from `@solidjs/web` | `<Teleport to="body">` | `Portal` from `@ark-ui/svelte/portal` | none                               |
| Lists          | `.map` with `key`                    | `<For>`                      | `v-for` with `:key`    | `{#each}` with a key                  | template strings or DOM            |

## React

```tsx
<Popover.Trigger render={<Button className="my-button" onClick={handleClick} />} />
<Popover.Trigger render={(props, state) => <button {...props}>{state.open ? 'Close' : 'Open'}</button>} />
```

- Passing an element merges your props with the part's. With a function, spread `props` onto one element.
- Ark components are client components. In React Server Components, put them in a file with `'use client'`.

## Solid

Solid 2 only: `solid-js` and `@solidjs/web` `>=2.0.0-rc.19`, with `"jsxImportSource": "@solidjs/web"`.

```tsx
<Popover.Trigger
  render={(props, state) => <button {...props({ onClick: mine })}>{state().open ? 'Close' : 'Open'}</button>}
/>
```

- `props` is a function. Pass your own props to it to merge them, rather than adding them after the spread.
- The render function runs once, so `state` is an accessor.
- Use `class`, not `className`. `For` and `Portal` come from `@solidjs/web`.
- Lists use `<For each={collection.items} keyed={false}>`, where the item is an accessor: `{(item) => item().label}`.
- Solid's DOM attributes are lowercase: `novalidate`, not `noValidate`.

## Vue

```vue
<Popover.Trigger>
  <template #render="{ props, state }">
    <button v-bind="props">{{ state.open ? 'Close' : 'Open' }}</button>
  </template>
</Popover.Trigger>
```

- `props` is an object. Bind it with `v-bind="props"`, not `props()`.
- Bind values with `v-model`, like `<Select.Root :collection="collection" v-model="value">`.
- Use `:class`, and `<Teleport to="body">` for overlays.

## Svelte

Svelte 5 with runes.

```svelte
<Popover.Trigger>
  {#snippet render(props, state)}
    <button {...props()}>{state.open ? 'Close' : 'Open'}</button>
  {/snippet}
</Popover.Trigger>
```

- `props` is a function: spread `props()`, and pass your own props to it to merge them.
- Bind values with `bind:value`, like `<Select.Root {collection} bind:value>`.
- `use{Component}` hooks need an `id`: `const id = $props.id()` once per component, then `useDialog({ id })`. Components
  like `<Dialog.Root>` create their own.

## Web

Light-DOM custom elements on `@zag-js/vanilla`, named `ark-{component}-{part}`: `<ark-dialog>`, `<ark-dialog-trigger>`,
`<ark-dialog-content>`.

```ts
import '@ark-ui/web/dialog'
```

Importing an entry registers its elements, so do it from a client entry point. Without a bundler, load
`https://cdn.jsdelivr.net/npm/@ark-ui/web@{version}/dist/cdn/{component}.js` as a module script, or `ark-web.js` for
every component. Pin an exact version.

```html
<ark-dialog>
  <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
  <ark-dialog-positioner>
    <ark-dialog-content>…</ark-dialog-content>
  </ark-dialog-positioner>
</ark-dialog>
```

- **Your element:** triggers wrap a native `button` or `a`, `ark-field-label` wraps a `label`, and input parts wrap an
  `input`, `select` or `textarea` you write. That native child gets the part's props. For other parts, add `as-child` to
  put the props on the first element child.
- **Forms:** give the root a `name`. Render the hidden part where the page shows one, like
  `<ark-checkbox-hidden-input>`. `ark-select` creates its hidden select from `name`, so it has none.
- **Props are kebab-case attributes,** like `default-value` or `same-width`. Elements take a subset of the framework
  props, listed on each web page, so check before assuming one exists. Object options like `ids` or a focus target are
  properties. Collections come from the item elements, like `<ark-select-item value="react">`, not from a collection
  object.
- **State:** roots have live properties (`open`, `value`, `checked`) that work like `input.value`, plus a read-only
  `state` on every root and part. While the controlled attribute is present, it wins.
- **Events** are lowercase and bubble: `valuechange`, `openchange`, `checkedchange`. `event.detail` is the change
  details object. Filter on `event.target` when components nest.
- **The full API:** `await el.ready`, then call `el.api`, like `el.api.setOpen(true)`.
- **Linked components:** set `ids` as a property, like `tooltip.ids = { trigger: 'avatar' }`.
