# Ark UI v6 — migration guide

> v6 is in beta on the [`v6`](https://github.com/chakra-ui/ark/tree/v6) branch, published under the `next` tag.
>
> You write the same Ark you already know — the same components, the same parts, the same state machines. What changed
> is how you compose a part with your own element, what the DOM looks like, and the zag v2 bump underneath.
>
> Most of the mechanical work is a codemod — see [Automated migration](#automated-migration). The checklist of what's
> done is in [the roadmap](https://github.com/chakra-ui/ark/discussions/3997).

---

## What v6 is

Three changes, plus the zag v2 bump underneath them:

1. **Composition.** `asChild` becomes a `render` function that also forwards the part's state.
2. **Data attributes.** `data-scope` / `data-part` become one attribute per part.
3. **Anatomy.** Anatomy moves to its own entry point.

v6 ships when zag v2 is stable. The beta runs on zag v2's `next` line.

---

## Try the beta

v5 and v6 ship side by side on npm. Install without a tag and you stay on stable v5; add `@next` for v6.

```bash
# React
npm i @ark-ui/react@next

# Solid / Svelte / Vue
npm i @ark-ui/solid@next
npm i @ark-ui/svelte@next
npm i @ark-ui/vue@next
```

Pin the exact version (`@ark-ui/react@6.0.0-next.0`) for reproducible installs — `@next` always resolves to the newest
prerelease.

---

## Automated migration

Most of the mechanical work ships as codemods in `@ark-ui/codemod`. Run `list` to see every transform, then run the ones
you need against your files.

```sh
# See every available transform
npx @ark-ui/codemod list

# Preview the changes without writing them
npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx" --dry
```

`--dry` prints a diff and writes nothing. Without it the codemod refuses to run on a dirty working tree, so a bad run is
one `git checkout` away (`--force` overrides). Anything ambiguous is left untouched and reported with a file and a reason
rather than guessed. Only Ark UI elements are rewritten — an `asChild` from another library in the same file is left
alone. Parts reached through local barrels, re-exports, or factory wrappers (`styled(ark.button)`) are resolved with the
`--cross-file` flag.

Beyond `as-child-to-render`, prop renames ship for every framework — `react/*`, `solid/*`, `svelte/*`, and `vue/*`:

| Transform                  | What it does                                                              |
| -------------------------- | ------------------------------------------------------------------------ |
| `as-child-to-render`       | Lift the `asChild` child into a `render` prop                            |
| `carousel-props`           | `slideCount` → `count`, `autoplay` → `autoPlay`, `padding` → `itemSpacing` |
| `floating-panel-placement` | `resizeTriggerAxes` → `resizeTriggerPlacements`, `axis` → `placement`     |
| `image-cropper-placement`  | `handles` → `placements`, `position` → `placement`                       |
| `tabs-virtual-focus`       | `composite` → `virtualFocus` (value inverted)                            |
| `popover-portalled`        | removes the `portalled` prop                                             |
| `tags-input-editable`      | adds `editable` to keep the old default                                  |
| `pin-input-count`          | `length` → `count`, or flags a missing `count`                          |
| `css/data-attributes`      | merge scope/part selectors, update toggle state selectors (stylesheets)  |

Two changes are left to do by hand because they reshape markup, not just props: the `popover` `Portal` wrapper, and the
`Combobox`/`Listbox`/`Select` `content` → `content` + `list` split. Both are covered below.

### Migrate with an AI agent

The codemod handles the renames. For the structural changes, paste this prompt into an AI agent (Claude Code, Cursor,
Copilot) pointed at your codebase — it has the full context for the manual work.

```text
You are migrating this codebase from Ark UI v5 to v6. Work framework-aware
(React, Solid, Svelte, or Vue — detect which one this project uses) and change
only Ark UI usage. After each step, run the project's typecheck/build.

1. Run the codemod for the mechanical rename, then review its report:
   npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx"
   (swap `react` for solid/svelte/vue; add `--cross-file` if parts are reached
   through local barrels, re-exports, or factory wrappers like styled(ark.button).)

2. Finish anything the codemod left. `asChild` is now a `render` function that
   receives (props, state):
   - React/Vue: move the child into the function/slot; spread `props`.
   - Solid/Svelte/Vue: `props` is a MERGE FUNCTION — spread `{...props()}`
     (Solid/Svelte) or `v-bind="props()"` (Vue), and call `props({ onClick })`
     to merge your handlers instead of overwriting them. In Solid, `state` is an
     accessor: `state().open`.

3. Toaster is no longer polymorphic: remove any `render`/`asChild` on it and
   drop `ToasterState`. Style the group with CSS (`data-placement`, `data-side`,
   `data-align`) or wrap your own element around it.

4. Combobox.Empty / Listbox.Empty move OUT of List to become a sibling of List.
   Put the styled message in a child element. For loading/error states, use the
   new `Status` part on Combobox, Listbox, and Select.

5. useCollator / useFilter now return values directly (no accessor/.value) on
   Solid, Svelte, and Vue: `collator.compare(a, b)`, `const { contains } = useFilter(...)`.

6. Svelte only: `useX` hooks require an `id` (`useCollapsible({ id })` where
   `const id = $props.id()`), and exports now match the other frameworks
   (Dialog parts prefixed, `TabsContentState` → `TabContentState`, etc.).

Report anything ambiguous instead of guessing.
```

---

## Composition: `asChild` becomes `render`

Polymorphism moves from a wrapper prop to a `render` function that receives the part's props **and** its state. Every
part gets one typed composition API, and you can read machine state inline.

```tsx
// ❌ v5
<Popover.Trigger asChild>
  <Button>Open</Button>
</Popover.Trigger>

// ✅ v6 — an element
<Popover.Trigger render={<Button>Open</Button>} />

// ✅ v6 — a function, to merge props and read state
<Popover.Trigger render={(props, state) => <Button {...props}>{state.open ? 'Close' : 'Open'}</Button>} />
```

The shape differs per framework. React and Vue move the child into the function or slot; Solid and Svelte are a rename
where the props object becomes a props **function** you must call.

```svelte
<!-- Svelte -->
<Collapsible.Trigger>
  {#snippet render(props, state)}
    <button {...props()}>{state.open ? 'Open' : 'Closed'}</button>
  {/snippet}
</Collapsible.Trigger>
```

```vue
<!-- Vue -->
<Collapsible.Trigger>
  <template #render="{ props, state }">
    <button v-bind="props()">{{ state.open ? 'Open' : 'Closed' }}</button>
  </template>
</Collapsible.Trigger>
```

> In Solid, Svelte, and Vue, `props` is a merge function: call `props({ onClick: mine })` to merge your handlers with the
> part's instead of overwriting them. In Solid, `state` is an accessor (`state().open`).

**Status.** Shipped in React, Solid, Svelte, and Vue. `asChild` still works and is deprecated — pairing it with `render`
throws in dev. Removal is a future major, not v6.

---

## `Toaster` is no longer polymorphic

`Toaster` no longer accepts `render` or `asChild`, and `ToasterState` is gone. Its children belong to the machine, so
handing them over dropped toasts. Style the group with CSS — it carries `data-placement`, `data-side`, and `data-align`
— or wrap your own element around `Toaster`.

---

## `Popover` is no longer portalled by prop

The `portalled` prop and `api.portalled` value are gone. The popover now detects whether its content is portalled from
where you render it and proxies tab order accordingly, so a forgotten `portalled` can no longer break keyboard access.
Decide portalling by rendering the content inside `Portal` or not.

```diff
- <Popover.Root portalled>
+ <Popover.Root>
    <Popover.Trigger>Open</Popover.Trigger>
+   <Portal>
      <Popover.Positioner>
        <Popover.Content>...</Popover.Content>
      </Popover.Positioner>
+   </Portal>
  </Popover.Root>
```

The `popover-portalled` codemod removes the prop; wrap the content in `Portal` yourself, as this is markup the codemod
won't reshape.

---

## `Combobox`/`Listbox`/`Select` gain a `List` part

The listbox semantics (`role="listbox"`, active-descendant, keyboard focus) move off `Content` onto a new `List` part.
`Content` becomes a plain wrapper, so you can render headers, footers, or a search input in the popup without polluting
the listbox. Wrap the items in `List` inside `Content`. This is structural, so the codemod leaves it to you.

```diff
  <Combobox.Content>
+   <Combobox.List>
      {items.map((item) => (
        <Combobox.Item key={item.value} item={item}>{item.label}</Combobox.Item>
      ))}
+   </Combobox.List>
  </Combobox.Content>
```

`Combobox.Empty` and `Listbox.Empty` also move **out** of `List`. `Empty` used to unmount when the collection was
non-empty, which kept it out of the accessibility tree. It now stays mounted as a sibling of `List` with `role="status"`,
swapping only its children — move it out and put your styled message in a child element. A new `Status` part on
`Combobox`, `Listbox`, and `Select` covers loading and error states that `Empty` can't distinguish.

The `composite` prop is gone; pass `popupType="dialog"` where you previously set `composite={false}`.

---

## Data attributes

Parts no longer carry `data-scope` and `data-part`. Each part gets one attribute named after the component and the part:

```html
<!-- ❌ v5 -->
<button data-scope="popover" data-part="trigger">Open</button>

<!-- ✅ v6 -->
<button data-popover-trigger="_r_0_" data-state="open" aria-controls="_r_0_:content">Open</button>
```

The attribute carries the part's scoped id as its value, so two popovers on a page stay distinguishable.

Update your selectors:

```css
/* ❌ v5 */
[data-scope='popover'][data-part='trigger'] {
}

/* ✅ v6 */
[data-popover-trigger] {
}
```

The `css/data-attributes` codemod rewrites stylesheets: it merges scope/part selectors, turns toggle `[data-state="on"]`
into `[data-pressed]`, and swaps the removed `data-focus` on toggle-group and toolbar for `:focus-within` /
`:focus-visible`. Attributes referenced from JavaScript strings, or selectors where scope and part aren't adjacent, are
left for you to update.

Ids are still generated where ARIA needs them to point somewhere, so `aria-controls` and `aria-labelledby` keep working.
Parts that nothing references no longer carry an `id` of their own. This comes from zag v2's anatomy, so it applies to
every framework at once.

**Known issue.** `SegmentGroup` currently emits `data-radio-group-*` instead of `data-segment-group-*`, because its
anatomy rename doesn't reach the attributes the machine emits. Don't write selectors against segment-group attributes
until that's fixed.

---

## Anatomy moved

Anatomy is no longer on the package root. Import it from the component, or from the `anatomy` entry point:

```tsx
// ❌ v5
import { dialogAnatomy } from '@ark-ui/react'

// ✅ v6 — either of these
import { dialogAnatomy } from '@ark-ui/react/dialog'
import { dialogAnatomy } from '@ark-ui/react/anatomy'
```

---

## Prop and export renames

These come from zag v2 and apply to every framework. Most have a codemod (see [above](#automated-migration)).

| Component        | v5                      | v6                                       |
| ---------------- | ----------------------- | ---------------------------------------- |
| Combobox, Select | `composite`             | `popupType`                              |
| Tabs             | `composite`             | removed, `virtualFocus` added            |
| Carousel         | `autoplay`              | `autoPlay`                               |
| Carousel         | `padding`, `slideCount` | removed, `count` and `itemSpacing` added |
| FloatingPanel    | `axis`                  | `placement`                              |
| FloatingPanel    | `resizeTriggerAxes`     | `resizeTriggerPlacements`                |
| FloatingPanel    | `ResizeTriggerAxis`     | `HandlePosition`                         |
| ImageCropper     | `position`              | `placement`                              |
| ImageCropper     | `handles`               | `placements`                             |
| Popover          | `portalled`             | removed                                  |
| PinInput         | `length`                | `count` (now required)                   |

New props you can now pass: `Select.alignItemWithTrigger`, `Select.initialFocusEl`, `Menu.menubar`,
`Accordion.loopFocus`, and the NumberInput scrubber props (`scrubberDirection`, `scrubberPixelSensitivity`,
`scrubberTeleportDistance`, `snapOnStep`).

---

## TreeView parts

TreeView's parts are restructured. `Branch` and `Item` are replaced by `Node`, `NodeGroup` and `Cell`:

| v5                           | v6                                       |
| ---------------------------- | ---------------------------------------- |
| `TreeView.Branch`            | `TreeView.NodeGroup`                     |
| `TreeView.BranchContent`     | `TreeView.NodeGroupContent`              |
| `TreeView.BranchControl`     | `TreeView.Node` wrapping `TreeView.Cell` |
| `TreeView.BranchText`        | `TreeView.NodeText`                      |
| `TreeView.BranchTrigger`     | `TreeView.NodeExpandTrigger`             |
| `TreeView.BranchIndicator`   | `TreeView.NodeIndicator type="expanded"` |
| `TreeView.BranchIndentGuide` | `TreeView.IndentGuide`                   |
| `TreeView.Item`              | `TreeView.Node` wrapping `TreeView.Cell` |
| `TreeView.ItemText`          | `TreeView.NodeText`                      |
| `TreeView.ItemIndicator`     | `TreeView.NodeIndicator type="selected"` |

`NodeIndicator` replaces both indicators and takes a required `type`: `"expanded"`, `"selected"`, `"checked"` or
`"indeterminate"`. `NodeProvider`, `NodeContext`, `NodeCheckbox`, `NodeRenameInput`, `Label`, `Tree` and `Root` are
unchanged.

**Status.** Done across React, Solid, Vue, and Svelte.

---

## Svelte

Two Svelte-only changes beyond the shared ones above.

**Hooks require an `id`.** After moving to zag v2, the `useX` hooks require an `id`. Without one, two instances on a page
generated the same element ids. Components (`<Collapsible.Root>`) are unaffected and still mint their own.

```diff
- const collapsible = useCollapsible()
+ const id = $props.id()
+ const collapsible = useCollapsible({ id })
```

`$props.id()` may only be called once per component; derive from it if you need two.

**Export parity.** Svelte exports now match the other frameworks. `Dialog`'s `Positioner`, `Root`, `RootProvider`,
`Title`, and `Trigger` are prefixed (`DialogPositioner`). `StepsStepChangeDetails` → `StepChangeDetails`,
`ColorPickerColor` → `Color`, `TabsContentState` / `TabsTriggerState` → `TabContentState` / `TabTriggerState`. Internals
such as `CheckboxProvider` and `splitCollapsibleProps` are no longer exported.

---

## `useCollator` and `useFilter` return values

For Solid, Svelte, and Vue, these hooks now return their values directly instead of an accessor, matching React. They
still follow locale changes.

```diff
- const collator = useCollator()
- collator().compare(a, b)      // Solid, Svelte
- collator.value.compare(a, b)  // Vue
+ const collator = useCollator()
+ collator.compare(a, b)
```

```diff
- const filters = useFilter({ sensitivity: 'base' })
- filters().contains(text, query)     // Solid, Svelte
- filters.value.contains(text, query) // Vue
+ const { contains } = useFilter({ sensitivity: 'base' })
+ contains(text, query)
```

---

## Still being finalized

Expect these to change before stable:

- **Stable zag v2.** v6 tracks zag's `2.0.0-next` line; stable zag v2 is the release gate for v6.
- **Masonry virtualization.** `WaterfallVirtualizer` isn't bound yet — planned for a later minor.
- **A deprecation window for the data attributes** — whether v6 emits the new attributes alongside the old for a release,
  or makes a clean break.

---

## Feedback

Roadmap and status: [#3997](https://github.com/chakra-ui/ark/discussions/3997)

Issues: <https://github.com/chakra-ui/ark/issues>
