# Styling

Ark sets no visual styles, only what positioning needs. Style each part by its data attribute, or pass `class` /
`className` to the part.

## Parts

Every part has one attribute, `data-{component}-{part}`:

```css
[data-dialog-backdrop] {
  background: rgb(0 0 0 / 0.5);
}
[data-dialog-content] {
  padding: 24px;
}
[data-select-item] {
  padding: 4px 8px;
}
```

Multi-word parts are kebab case: `[data-dialog-close-trigger]`, `[data-select-item-indicator]`. There is no `data-scope`
or `data-part` in v6.

## State

States add attributes to the parts they affect. Each component page lists them per part.

```css
[data-accordion-item-trigger][data-state='open'] {
  font-weight: 600;
}
[data-select-item][data-highlighted] {
  background: var(--gray-100);
}
[data-checkbox-control][data-state='checked'] {
  background: var(--blue-600);
}
[data-field-control][data-invalid] {
  border-color: var(--red-600);
}
[data-toggle-root][data-pressed] {
  background: var(--gray-200);
}
```

Some components expose CSS variables, like `--layer-index`, `--available-height` on positioners, or `--steps-percent`.
The component page lists them.

Indicator and control parts inside a `button` or `label` render a `span`. Set `display` before giving them a size or a
`transform`.

## Layering

Put overlays in a portal (see [frameworks.md](frameworks.md)), then set `z-index` on the positioner and backdrop, never
the content. Use one shared base for every overlay, plus `--layer-index`, the overlay's position among open layers:

```css
[data-popover-positioner],
[data-menu-positioner],
[data-select-positioner],
[data-dialog-positioner] {
  z-index: calc(1400 + var(--layer-index));
}
[data-dialog-backdrop] {
  z-index: calc(1399 + var(--layer-index));
}
```

- `--layer-index` alone gives `0`, `1`, `2`, which lands under app chrome. Always add a base.
- One base for every overlay type lets a menu inside a dialog, or a dialog opened from a popover, stack correctly.
- Toasts: set `z-index` on `[data-toast-group]`. Tour: use `--tour-layer` on the positioner.
- Layers with nested layers get `data-nested`, `data-has-nested` and `--nested-layer-count`.

## Panda CSS

Build a slot recipe from the anatomy. Import anatomy from the `anatomy` entry:

```ts
import { accordionAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const accordion = defineSlotRecipe({
  className: 'accordion',
  slots: accordionAnatomy.keys(),
  base: {
    item: { borderBottomWidth: '1px', _open: { bg: 'gray.100' } },
  },
})
```

## Tailwind CSS

Pass classes to each part and use data variants for state:

```tsx
<Accordion.Item className="border-b data-[state=open]:bg-gray-100" value="a" />
```

## Animation

Content parts that open and close stay mounted while their exit animation runs. Animate on `[data-state='open']` and
`[data-state='closed']`. Add `lazyMount` and `unmountOnExit` to the root to mount content only when open.
