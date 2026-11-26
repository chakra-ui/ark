---
name: ark-ui
description:
  Builds accessible UI with Ark UI v6 in React, Solid, Vue, Svelte or Web Components. Covers picking a component,
  composing its parts, the render prop, controlled and default state, reading state, styling parts by data attribute,
  overlays and layering, forms with Field and Fieldset, collections, virtualization, and upgrading from v5. Use whenever
  a project has @ark-ui/* 6.x installed or the user mentions Ark UI.
---

# Build with Ark UI

Ark UI ships headless, accessible components built on Zag.js state machines. Each component is a set of parts you
compose, like `Dialog.Root`, `Dialog.Trigger` and `Dialog.Content`. Ark renders sensible elements and wires behavior and
ARIA. It sets no visual styles.

## Read the right docs

1. **Check the installed version** in `package.json`. This skill is for `@ark-ui/*` 6.x, including `6.0.0-next.*`.
2. **The docs host** for v6 is `https://ark-docs-git-v6-chakra-ui.vercel.app`. Every `{docs}` below means that host.
   Links inside `llms.txt` and the pages point at `ark-ui.com`, which still serves v5: replace that host with `{docs}`.
3. **Find the component** in [references/components.md](references/components.md). Before writing any `role=` attribute,
   check there. A hand-written `role="listbox"`, `"menu"`, `"dialog"`, `"tablist"` or `"slider"` next to an installed
   Ark package is almost always a mistake.
4. **Read its page** at `{docs}/docs/{framework}/{section}/{slug}.md`. The framework is `react`, `solid`, `vue`,
   `svelte` or `web`. Each page has the anatomy, examples in that framework, the props and the data attributes. Read
   only the pages the task needs. `{docs}/llms.txt` lists every page.

The types are the API: each package's `.d.ts` files. Don't read compiled JavaScript in `dist/`.

## The pattern

```tsx
import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'

export const Demo = () => (
  <Popover.Root>
    <Popover.Trigger>Open</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
```

1. Import the component from its own entry, `@ark-ui/{framework}/{component}`, never from the package root.
2. Render the parts the page's anatomy shows, nested the same way.
3. Configure the root with props, and style each part by its data attribute.

Each framework spells props, state and composition its own way. Read
[references/frameworks.md](references/frameworks.md) before writing Solid, Vue, Svelte or web code.

## Rules

- **Render every part the anatomy shows.** A label part names the control. A positioner wraps popup content. A missing
  part breaks ARIA or positioning.
- **Use your own element with `render`.** It hands you the part's props and its state. `asChild` still works but is
  deprecated, and a part given both is a bug. See [references/frameworks.md](references/frameworks.md).
- **Start with `default{X}`, or control with `{x}` and `on{X}Change`**, like `defaultValue`, or `value` with
  `onValueChange`. Change callbacks receive a details object, like `({ value })`, not the bare value. Vue uses
  `v-model`, Svelte `bind:value`, web the attribute plus a `valuechange` event.
- **Reach state from outside the parts** with `Component.Context`, the `use{Component}Context` hook, or a
  `use{Component}` hook passed to `Component.RootProvider` in place of `Root`.
- **Style with data attributes.** Every part has `[data-{component}-{part}]`, and states add attributes such as
  `[data-state="open"]` and `[data-disabled]`. See [references/styling.md](references/styling.md).
- **Overlays need a portal and a `z-index` on the positioner**, never on the content. See
  [references/styling.md](references/styling.md#layering).
- **Forms go through `Field` and `Fieldset`**, and form-bound components need their hidden input part. See
  [references/forms.md](references/forms.md).
- **Select, Combobox, Listbox and Tree View take a collection**, not an `items` array. Their items go inside the `List`
  part. See [references/collections.md](references/collections.md).
- **Don't add ARIA or roles that Ark already sets.** Name controls with the label part, or `aria-label` when there's no
  visible text.
- **Don't write Ark v5 code in a v6 project.** Most models learned v5. Check
  [references/upgrading.md](references/upgrading.md) for what changed.

## When you're done

1. **Typecheck** with the project's checker: `tsc --noEmit`, `vue-tsc --noEmit` or `svelte-check`.
2. **Use it with a keyboard** in a browser: Tab to it, use the arrow keys, Enter, Space and Escape, and check that focus
   lands where you'd expect after opening and closing.
3. **Report** each command you ran and its result, anything you couldn't check, and anything the docs got wrong or left
   out.
