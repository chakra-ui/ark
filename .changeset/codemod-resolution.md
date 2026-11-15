---
'@ark-ui/codemod': patch
---

- Fixed the prop-rename transforms (`carousel-props`, `pin-input-count`, `tags-input-editable` and the rest) and
  `css/data-attributes` skipping every file that didn't contain `asChild`. Once `as-child-to-render` had removed it,
  they changed nothing.
- Fixed prop renames not applying to aliased components (`import { PinInput as StyledPinInput }`) and to flat part
  imports (`<CarouselRoot />`), and wrongly applying to another component imported under a matching name
  (`import { Tabs as Carousel }`). Applies to React, Solid, Vue and Svelte.
- Fixed `--cross-file` missing components reached through a namespace re-export (`export * as Drawer from './drawer'`)
  or a namespace import (`import * as Checkbox from './checkbox'`). Those sites were skipped without being reported. A
  namespace now resolves the part you use (`Drawer.Trigger`), not every export of the module.
- `as-child-to-render` (React) now converts a child that is a conditional between two elements
  (`{hero ? <Button /> : <IconButton />}`) instead of reporting it.
- `--cross-file` runs are much faster: imports are resolved without building a TypeScript program for every file.
