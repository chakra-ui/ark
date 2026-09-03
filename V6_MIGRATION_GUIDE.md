# Ark UI v6 — migration guide

> v6 is in progress on the [`v6`](https://github.com/chakra-ui/ark/tree/v6) branch. Nothing is published yet.
>
> You write the same Ark you already know — the same components, the same parts, the same state machines. What changed
> is how you compose a part with your own element, and what the DOM looks like.
>
> This guide grows as v6 lands. Sections marked **planned** aren't built yet, so treat them as intent, not API. The
> checklist of what's done is in [the roadmap](https://github.com/chakra-ui/ark/discussions/3997).

---

## What v6 is

Four changes, plus the zag v2 bump underneath them:

1. **Composition.** `asChild` becomes a `render` prop.
2. **Indicators.** Indicator parts render from their own state instead of being toggled by boolean props.
3. **Data attributes.** `data-scope` / `data-part` become one attribute per part.
4. **Anatomy.** Anatomy moves to its own entry point.

v6 ships when zag v2 is stable. The base work runs on zag v2 betas.

---

## Composition: `asChild` becomes `render` — planned

`asChild` is removed in v6. Pass your element to `render` instead:

```tsx
// ❌ v5
<Popover.Trigger asChild>
  <Button>Open</Button>
</Popover.Trigger>

// ✅ v6
<Popover.Trigger render={<Button>Open</Button>} />
```

`render` also takes a function, so you can merge the props yourself and read the part's state:

```tsx
// ✅ v6
<Popover.Trigger render={(props) => <Button {...props}>Open</Button>} />
```

**Status.** The React factory supports `render` today. Solid, Vue and Svelte still ship the v5 `asChild` factory, and
the non-JSX form is an open question — a Vue SFC and a Svelte snippet don't take a render function the way React does.

---

## Indicators render from state — planned

Indicator parts take a `render` function and branch on state, rather than being toggled by boolean props:

```tsx
// ❌ v5
<Checkbox.Indicator>
  <CheckIcon />
</Checkbox.Indicator>
<Checkbox.Indicator indeterminate>
  <MinusIcon />
</Checkbox.Indicator>

// ✅ v6
<Checkbox.Indicator
  render={(props, state) => {
    if (state.status === 'checked') return <CheckIcon {...props} />
    if (state.status === 'indeterminate') return <MinusIcon {...props} />
    return <SquareIcon {...props} />
  }}
/>
```

This also fixes the layout problem in v5, where an indicator that rendered nothing left a hole in a flex or grid row.

**Status.** Not built in any framework.

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

Ids are still generated where ARIA needs them to point somewhere, so `aria-controls` and `aria-labelledby` keep working.
Parts that nothing references no longer carry an `id` of their own.

This comes from zag v2's anatomy, so it applies to every framework at once.

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

These come from zag v2 and apply to every framework.

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

New props you can now pass: `Select.alignItemWithTrigger`, `Select.initialFocusEl`, `Menu.menubar`,
`Accordion.loopFocus`, and the NumberInput scrubber props (`scrubberDirection`, `scrubberPixelSensitivity`,
`scrubberTeleportDistance`, `snapOnStep`).

---

## TreeView parts — planned

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
`"indeterminate"`.

`NodeProvider`, `NodeContext`, `NodeCheckbox`, `NodeRenameInput`, `Label`, `Tree` and `Root` are unchanged.

**Status.** Done in React, Solid and Vue. Svelte still ships the v5 parts.

---

## Still being finalized

Expect these to change:

- **The non-JSX `render` API.** What `render` looks like in a Vue SFC and a Svelte snippet isn't settled.
- **Indicator state shapes.** The state each indicator receives is still being designed.
- **A deprecation window for the data attributes.** Whether v6 emits the new attributes alongside the old for a release,
  or makes a clean break.
- **A `useRender` utility.** So library authors can build parts with the same composition behaviour.
- **A codemod** for `asChild` → `render`.

---

## Feedback

Roadmap and status: [#3997](https://github.com/chakra-ui/ark/discussions/3997)

Issues: <https://github.com/chakra-ui/ark/issues>
