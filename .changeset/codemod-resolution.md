---
'@ark-ui/codemod': patch
---

- Fixed the prop-rename transforms (`carousel-props`, `pin-input-count`, `tags-input-editable` and the rest) and
  `css/data-attributes` skipping every file that didn't mention `asChild`. After running `as-child-to-render` they
  changed nothing.
- Fixed prop renames not applying to aliased components (`import { PinInput as StyledPinInput }`) and wrongly applying
  to a different component imported under a matching alias (`import { Tabs as Carousel }`). Applies to React, Solid, Vue
  and Svelte.
- Fixed `--cross-file` missing components reached through a namespace re-export (`export * as Drawer from './drawer'`)
  or a namespace import (`import * as Checkbox from './checkbox'`). Those sites were skipped without being reported.
- `as-child-to-render` (React) now converts a child that is a conditional between two elements
  (`{hero ? <Button /> : <IconButton />}`) instead of reporting it.
