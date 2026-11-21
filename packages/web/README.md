# Ark UI Web

Unstyled, accessible web components powered by Zag.js state machines. Components use light DOM, native controls, and
ordinary CSS. No framework runtime is required.

This package is a prerelease. It includes accordion, angle slider, avatar, carousel, checkbox and checkbox group,
clipboard, collapsible, combobox, command, date input, date picker, dialog, drawer, editable, field, fieldset, file
upload, highlight, hover card, listbox, marquee, menu, menubar, meter, number input, pagination, password input, pin
input, popover, progress, qr code, radio group, rating group, scroll area, segment group, select, signature pad, slider,
splitter, steps, swap, switch, tabs, tags input, timer, toast, toggle, toggle group, tooltip, tour, tree view, and
virtualizer.

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
bundler, and a CDN build that needs no bundler (see [Without a bundler](#without-a-bundler)). Registration is
idempotent; the first loaded version owns each `ark-*` tag for the document.

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

Add `as-child` to any part, or to a root that renders root props, to put its props on its first element child instead.
The wrapper then gets `display: contents`. `template` and `script` children are skipped, and lazy `<template>` content
goes inside the child. If the child is replaced, the new child receives the props and the old one loses them.

```html
<ark-menu-item value="settings" as-child><a href="/settings">Settings</a></ark-menu-item>
<ark-dialog-content as-child><section class="sheet">…</section></ark-dialog-content>
```

### Without a bundler

Load every component from a CDN with one module script:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@ark-ui/web@0/dist/cdn/ark-web.js"></script>
```

`ark-web.js` is a single file with all components and their dependencies. To load only what a page uses, import the
per-component entries instead. They share one common chunk:

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@ark-ui/web@0/dist/cdn/select.js'
  import 'https://cdn.jsdelivr.net/npm/@ark-ui/web@0/dist/cdn/dialog.js'
</script>
```

Helpers such as `createListCollection` are exported from the same files. Pin an exact version in production.

### Editor support

The package ships a [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) at
`dist/custom-elements.json`, referenced from `package.json` through `customElements`. It lists every element with its
attributes, events and properties, for tools such as Storybook, linters and documentation generators.

For tag and attribute completion in VS Code's HTML editor, add the generated custom data to your workspace settings:

```json
{
  "html.customData": ["./node_modules/@ark-ui/web/dist/vscode.html-data.json"]
}
```

### Debugging

Add `debug` to a root, or to any ancestor such as `<body>`, to log its props, state transitions and events to the
console:

```html
<ark-dialog id="profile" debug>…</ark-dialog>
```

```
[ark] ark-dialog#profile props {…}
[ark] ark-dialog#profile event openchange {open: true, reason: 'trigger-click'}
[ark] ark-dialog#profile state closed → open
```

Logs use `console.debug`, so enable verbose messages in the browser console. Remove the attribute to stop logging.

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

Roots also have live state properties that work like `input.value`: `open`, `value`, `checked`, `pressed`, `visible`,
`page`, and so on, typed on each element. Reading returns the current state, using Zag's own value types (strings and
arrays; date picker values are ISO date strings). Writing updates the state and, like a native property, dispatches no
change event. Properties are for uncontrolled use: while the controlled attribute is present it wins and writes are
ignored. Values written before the element connects apply once it starts.

```ts
const dialog = document.querySelector('ark-dialog')!
dialog.open = true
select.value = ['react']
combobox.inputValue = 'app' // filters the items, like typing
```

Actions that aren't state are element methods. Like properties, they can be called before the element connects and run
once it starts; removing the element cancels calls that haven't run yet. Unlike property writes, they dispatch the same
events as the matching user interaction.

| Element                                     | Methods                                                  |
| ------------------------------------------- | -------------------------------------------------------- |
| `ark-timer`                                 | `start()`, `pause()`, `resume()`, `reset()`, `restart()` |
| `ark-clipboard`                             | `copy()`                                                 |
| `ark-signature-pad`                         | `clear()`                                                |
| `ark-file-upload`                           | `clearFiles()`, `openFilePicker()`                       |
| `ark-number-input`                          | `increment()`, `decrement()`                             |
| `ark-tree-view`                             | `expand(values?)`, `collapse(values?)`                   |
| `ark-combobox`, `ark-select`, `ark-listbox` | `clearValue(value?)`                                     |
| `ark-carousel`                              | `scrollNext(instant?)`, `scrollPrevious(instant?)`       |
| `ark-marquee`                               | `restart()`                                              |
| `ark-tour`                                  | `start(id?)`, `next()`, `previous()`                     |

```ts
const timer = document.createElement('ark-timer')
timer.start() // runs when the timer connects
document.body.append(timer)
```

Change event details also carry `source`: `'keyboard'`, `'mouse'`, `'touch'`, or `'pen'` when the change comes from user
input being handled, and `'programmatic'` otherwise, e.g. for `api` calls. Zag's `reason`, where it provides one, is
kept. A callback with a bare value gets an object detail, so `pressedchange` is `{ pressed, source }`.

Root element types, such as `CheckboxElement` and `SelectElement`, are interfaces with the typed properties and methods
above. They also expose the full Zag `api` once started. Await `ready` to know when that is; it resolves when the
machine starts and is renewed each time the element reconnects:

````ts
await select.ready
select.api!.getItemState({ item })
``` TypeScript's
`HTMLElementTagNameMap` includes the root tags, so `document.querySelector('ark-select')` is typed.

## Collections and forms

Select, combobox, command, listbox, and tree view read their items from one of three sources, highest priority first:

1. A `collection` property, created with `createListCollection` (or `createGridCollection` for a listbox grid,
   `createPageListCollection` for command pages, `createTreeCollection` for a tree view). These are exported from the
   package root, `@ark-ui/web/collection` and each component's module, as in the framework packages.
2. A direct `<script type="application/json">` child with an array of strings or `{ value, label, disabled, group }`
   objects. Tree items can include `children`; command items can include `keywords` and a `parent`.
3. The item elements in the markup.

```ts
import { createListCollection } from '@ark-ui/web/select'

const select = document.querySelector('ark-select')!
select.collection = createListCollection({
  items: members,
  itemToValue: (member) => member.id,
  itemToString: (member) => member.name,
  isItemDisabled: (member) => member.away,
  groupBy: (member) => member.team,
})
select.addEventListener('valuechange', (event) => {
  const [member] = event.detail.items
})
````

Values stay string keys: the `value` attribute and form submissions use `itemToValue`. Assign a new collection when the
data changes; changes inside an existing collection aren't observed. Markup and JSON changes are observed automatically.
Element types take the item type, e.g. `document.querySelector<SelectElement<Member>>('ark-select')`, so
`event.detail.items` and `api.selectedItems` are typed.

Items from a property or JSON are rendered into the list. A `<template>` in the list is stamped once per item, and a
`<template data-group>` once per group, filling in the item's value, disabled state and text from the collection.
Without templates, minimal item parts are rendered, e.g.
`<ark-select-item value="…"><ark-select-item-text>…</ark-select-item-text></ark-select-item>`. Add the `manual`
attribute to the list to render items yourself, e.g. a virtualized window; see `examples/select/virtualized.ts`. Item
parts set `aria-posinset` and `aria-setsize` from the collection, and `scrollToIndexFn` lets keyboard navigation reach
items that aren't rendered.

Separators aren't items: style them between groups in CSS, e.g.
`.group:not([hidden]) ~ .group:not([hidden]) { border-top: 1px solid }`, so groups hidden by filtering never add one.

For data that loads asynchronously, `createAsyncList` from `@ark-ui/web/async-list` wraps Zag's async list in a small
store. Subscribe to it and assign a new collection on each change; see `examples/combobox/async-search.ts` and
`examples/listbox/load-more.ts`. Combobox and command take a `loading` attribute, which sets `aria-busy`.

```ts
import { createAsyncList } from '@ark-ui/web/async-list'
import { createListCollection } from '@ark-ui/web/combobox'

const list = createAsyncList<Movie>({
  async load({ filter, signal }) {
    const response = await fetch(`/api/movies?q=${filter}`, { signal })
    return { items: await response.json() }
  },
})
list.subscribe(() => {
  combobox.collection = createListCollection({ items: list.items, itemToValue: (movie) => movie.id })
  combobox.toggleAttribute('loading', list.isLoading)
})
combobox.addEventListener('inputvaluechange', (event) => list.setFilter(event.detail.inputValue))
```

Combobox's built-in `filter="contains"` and `filter="starts-with"` ignore case and accents and follow the nearest
`lang`. Use `createFilter` from `@ark-ui/web/locale` to match the same way in your own filtering:

```ts
import { createFilter } from '@ark-ui/web/locale'

const { contains } = createFilter({ sensitivity: 'base' })
contains('Café', 'cafe') // true
```

Long lists render through `<ark-list-virtualizer>` (also `<ark-window-virtualizer>` and `<ark-grid-virtualizer>`). Items
come from a template and `renderItem` fills them. Inside a collection component, compose with `as-child` so the
component keeps its roles and the virtualizer only positions:

```html
<ark-select-list as-child manual>
  <ark-list-virtualizer count="5000" estimated-size="36">
    <ark-list-virtualizer-content>
      <template>
        <ark-list-virtualizer-item as-child>
          <ark-select-item><ark-select-item-text></ark-select-item-text></ark-select-item>
        </ark-list-virtualizer-item>
      </template>
    </ark-list-virtualizer-content>
  </ark-list-virtualizer>
</ark-select-list>
```

```ts
list.renderItem = (element, item) => {
  const { value, label } = collection.items[item.index]
  element.setAttribute('value', value)
  element.querySelector('ark-select-item-text')!.textContent = label
}
select.scrollToIndexFn = ({ index }) => list.virtualizer?.scrollToIndex(index)
```

Form controls use native hidden inputs or a hidden select for submission and validation. Include the component's
hidden-input part where shown in its examples. Set `name` and `value` on the root. Select creates its hidden select
automatically; add `<ark-select-hidden-input>` to submit through hidden inputs instead, which suits large or virtualized
lists. Custom element wrappers are not themselves form-associated elements.

Wrap a control in `ark-field` to link it to a label, helper text, and error text. `disabled`, `invalid`, `readonly`, and
`required` on the field reach its native input, textarea, or select, and the components inside it, such as checkbox,
select, and number input. Fields validate with native constraints, and `validation-mode` (`onSubmit`, `onBlur`, or
`onChange`) sets when errors show. Assign a `validate` function or server `errors` to the field element, and listen for
`validitychange`. Error text is hidden while the field is valid; `match` limits it to one native failure, such as
`valueMissing`. `ark-field-indicator type="required"` shows only while the field is required. `ark-fieldset` wraps a
native `fieldset`, so `disabled` on it disables every control inside, and its fields take that state too.

```html
<ark-field required>
  <ark-field-label>
    <label>
      Email
      <ark-field-indicator type="required">*</ark-field-indicator>
    </label>
  </ark-field-label>
  <ark-field-input><input type="email" /></ark-field-input>
  <ark-field-helper-text>We never share it.</ark-field-helper-text>
  <ark-field-error-text>Enter a valid email.</ark-field-error-text>
</ark-field>
```

## Styling and presence

Style parts using your own classes or the `data-<scope>-<part>` attribute each part sets, e.g. `[data-menu-trigger]` or
`[data-select-item]`. State is exposed through attributes such as `data-state`, `data-disabled`, and `data-invalid`. The
library supplies only default element display and hidden handling. Storybook's styles are examples and are not included
in the published package.

Components also work within an existing shadow root; include your styles in that root.

A part can live outside its root, e.g. an overlay moved to the end of `<body>`, by pointing `for` at the root's `id`.
Parts nested inside it find the root too. The part must be in the same document or shadow root as the root, and it
connects once that root appears. Items that a root reads from its own markup, such as collection or carousel items, must
stay in its subtree. See `examples/dialog/portal.ts`.

```html
<ark-dialog id="settings">
  <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
</ark-dialog>
<ark-dialog-positioner for="settings">
  <ark-dialog-content>…</ark-dialog-content>
</ark-dialog-positioner>
```

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
bun run test            # Vitest + happy-dom
```

Tests mount the examples into happy-dom and drive them with Testing Library, like the other framework packages.

The package is organized as follows:

- `src/components/<component>/root.ts`: machine configuration, attributes, and events.
- `src/components/<component>/parts.ts`: DOM props and behavior for the component's parts.
- `src/components/<component>/shared.ts`: internal tags, collection helpers, and shared state.
- `src/components/<component>/index.ts`: component registration and public element types.
- `src/utils/`: element lifecycle, collections, attributes, lazy mounting, and presence.
- `examples/<component>/`: self-contained examples with markup, data, icons, and helpers in the same file.
- `src/components/<component>/<component>.stories.ts`: Storybook metadata and example exports.
- `src/components/<component>/tests/`: interaction tests for that component.
- `src/utils/tests/`: tests for the shared element runtime.

## Release prerequisite

The current `2.0.0-next.4` Zag dependencies use repository patches for vanilla prop resolution, tree state caching, menu
behavior, and combobox highlighting in inline lists such as command. In particular, menu cleanup calls the patched
`removeChild` API. A package consumer does not inherit this repository's patches.

Before publishing, release those changes in Zag, update this package's dependency versions, and verify the package in a
clean consumer install without patches. Then run the checks above and `npm pack --dry-run`. The archive should contain
only `dist/`, this README, the license, and package metadata. No Storybook code, examples, tests, or evidence images
ship.
