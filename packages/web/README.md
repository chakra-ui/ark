# Ark UI Web

Unstyled, accessible web components powered by Zag.js state machines. Components use light DOM, native controls, and
ordinary CSS. No framework runtime is required.

This package is a prerelease. Its initial surface includes accordion, checkbox and checkbox group, collapsible,
combobox, dialog, listbox, menu, popover, radio group, select, slider, switch, tabs, tooltip, and tree view.

## Usage

Import the components you use from a browser entry point:

```ts
import '@ark-ui/web/accordion'
import '@ark-ui/web/dialog'
```

Or register all components:

```ts
import '@ark-ui/web'
```

Imports register custom elements as a side effect. Import them in the browser; server rendering can output their HTML,
but must defer registration to a client entry point. The package ships ESM and TypeScript declarations for use with a
bundler. Registration is idempotent; the first loaded version owns each `ark-*` tag for the document.

```html
<ark-accordion collapsible default-value="intro">
  <ark-accordion-item value="intro">
    <ark-accordion-item-header>
      <ark-accordion-item-trigger><button type="button">Introduction</button></ark-accordion-item-trigger>
    </ark-accordion-item-header>
    <ark-accordion-item-content>Build accessible interfaces with ordinary HTML.</ark-accordion-item-content>
  </ark-accordion-item>
</ark-accordion>
```

Interactive parts wrap real controls: triggers wrap a direct `button` or `a`, input parts wrap a direct `input`, and
checkbox and switch roots wrap a direct `label`. Keep the native element inside its custom element wrapper. Some
collection items can optionally wrap an anchor. Examples show the markup each component expects.

## State and events

Use `default-value`, `default-checked`, or `default-open` where supported for uncontrolled initial state. Use `value`,
`checked`, or `open` for controlled state and update the attribute in response to change events. List values are
comma-separated. Boolean HTML attributes such as `disabled`, `required`, and `multiple` are enabled by their presence;
remove them to disable the option. Controlled `open` and `checked` also accept `"false"`, and checkbox `checked`
supports `"indeterminate"`.

Events use lowercase names such as `valuechange`, `checkedchange`, and `openchange`. Their `CustomEvent.detail` is the
Zag change details object. They bubble through the component's DOM tree. Filter `event.target` when listening to nested
components. Events remain within a shadow root unless the application forwards them.

```html
<ark-checkbox checked="false" name="terms" value="accepted">
  <label>
    <ark-checkbox-control></ark-checkbox-control>
    <ark-checkbox-label>Accept terms</ark-checkbox-label>
    <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
  </label>
</ark-checkbox>
```

```ts
import '@ark-ui/web/checkbox'

const checkbox = document.querySelector('ark-checkbox')!
checkbox.addEventListener('checkedchange', (event) => {
  if (event.target !== checkbox) return
  const { checked } = (event as CustomEvent<{ checked: boolean | 'indeterminate' }>).detail
  checkbox.setAttribute('checked', String(checked))
})
```

Root element types, such as `CheckboxElement` and `SelectElement`, expose a typed `api` after connection. Check `api`
before using it. TypeScript's `HTMLElementTagNameMap` includes the root tags, so `document.querySelector('ark-select')`
is typed.

## Collections and forms

Select, combobox, listbox, and tree view accept items from their child markup, a direct
`<script type="application/json">`, or an `items` property. Data-driven collections need item templates in the list; see
`examples/select/from-json.ts` and `examples/tree-view/from-json.ts` for complete markup.

```ts
import type { ItemInput } from '@ark-ui/web'

const items: ItemInput[] = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid', disabled: true },
]
const select = document.querySelector('ark-select')!
select.items = items
```

Assign a new `items` array when data changes. Markup and JSON changes are observed automatically. Tree items can include
`children`; flat collections can include a `group`.

Form controls use native hidden inputs or a hidden select for submission and validation. Include the component's
hidden-input part where shown in its examples. Set `name` and `value` on the root. Select creates its hidden select
automatically. Custom element wrappers are not themselves form-associated elements.

## Styling and presence

Style parts using your own classes or `[data-scope][data-part]` selectors. State is exposed through attributes such as
`data-state`, `data-disabled`, and `data-invalid`. The library supplies only default element display and hidden
handling. Storybook's styles are examples and are not included in the published package.

Components also work within an existing shadow root; include your styles in that root. Overlay parts must stay in their
root's DOM subtree so they can find their owning state machine.

For lazy content, put children in a `<template>` inside the content part. `unmount-on-exit` returns the children to that
template when they exit. Presence-aware components keep content mounted for exit animations. See the lazy-mount and
shadow-root examples for each component.

## Development

Run commands from this directory with the repository's Bun installation:

```sh
bun run storybook       # http://localhost:6007
bun run typecheck
bun run lint
bun run build           # ESM + declarations in dist/
bun run build:storybook
bun run test            # static Storybook on port 6017 + Chromium
```

Install Playwright's Chromium if needed, or set `CHROME` to an existing Chrome executable. Tests cover every Storybook
example plus keyboard interaction, form values, shadow roots, focus restoration, and reconnect cleanup.

The package is organized as follows:

- `src/components/<component>/root.ts`: machine configuration, attributes, and events.
- `src/components/<component>/parts.ts`: DOM props and behavior for the component's parts.
- `src/components/<component>/shared.ts`: internal tags, collection helpers, and shared state.
- `src/components/<component>/index.ts`: component registration and public element types.
- `src/utils/`: element lifecycle, collections, attributes, lazy mounting, and presence.
- `examples/<component>/`: self-contained examples with markup, data, icons, and helpers in the same file.
- `stories/`: Storybook metadata and example exports.
- `tests/`: browser smoke and interaction coverage.

## Release prerequisite

The current `2.0.0-next.4` Zag dependencies use repository patches for vanilla prop resolution, tree state caching, and
menu behavior. In particular, menu cleanup calls the patched `removeChild` API. A package consumer does not inherit this
repository's patches.

Before publishing, release those changes in Zag, update this package's dependency versions, and verify the package in a
clean consumer install without patches. Then run the checks above and `npm pack --dry-run`. The archive should contain
only `dist/`, this README, the license, and package metadata. No Storybook code, examples, tests, or evidence images
ship.
