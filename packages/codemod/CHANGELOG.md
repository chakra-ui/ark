# @ark-ui/codemod

## [6.0.0-next.0] - 2026-09-23

### Added

- Add `@ark-ui/codemod`, a CLI for migrating Ark UI codebases between versions.
  ```sh
  npx @ark-ui/codemod list
  npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx" --dry
  ```
  Ships the `asChild` → `render` migration as one transform per framework, because the shape of the change differs:
  React and Vue move the child element into a prop or a slot, while Solid and Svelte are renames with a signature
  change. `--dry` prints a diff and writes nothing. Without it the codemod refuses to run on a dirty working tree, so a
  bad run is one `git checkout` away. Anything ambiguous is left alone and reported with a file and a reason rather than
  guessed.
- Add prop-rename and data-attribute transforms alongside `as-child-to-render`. Prop renames ship for every framework —
  `react/*`, `solid/*`, `svelte/*`, and `vue/*` — driven by the zag v2 changes: `carousel-props` (`slideCount` →
  `count`, `autoplay` → `autoPlay`, `padding` → `itemSpacing`), `floating-panel-placement`, `image-cropper-placement`,
  `tabs-virtual-focus` (inverts the value), `popover-portalled`, `tags-input-editable` (preserves the old default), and
  `pin-input-count` (renames `length`, or flags a missing `count`). `css/data-attributes` rewrites stylesheets for the
  merged `data-{scope}-{part}` attribute, toggle `[data-state="on"]` → `[data-pressed]`, and the removed `data-focus` on
  toggle-group and toolbar.
  ```sh
  npx @ark-ui/codemod react/carousel-props "src/**/*.tsx" --dry
  npx @ark-ui/codemod css/data-attributes "src/**/*.css" --dry
  ```
  Changes that reshape markup — the popover `Portal` wrapper and the `Combobox`/`Listbox`/`Select` `content` → `list`
  split — are left to do by hand and called out in the upgrade guide.

### Fixed

- Fix and harden the `as-child-to-render` transforms.
  - Solid's `render` prop takes the same props **function** as `asChild`, so it must be called (`{...props()}`) to
    spread the part's props. The transform was rewriting `props()` to `props`, which spread the function itself and
    forwarded nothing (including the child's own content). It is now a pure rename that leaves the callback body
    untouched.
  - The React, Solid and Vue transforms now act only on Ark UI components — elements whose tag resolves to an
    `@ark-ui/*` import (following aliases) — instead of any element that happens to use `asChild`, so a Radix or other
    library's `asChild` in the same file is left alone. The Svelte transform keys off the Ark-specific `asChild` snippet
    name.
  - A `--cross-file` flag (React and Solid) resolves Ark parts imported through local barrels/re-exports back to
    `@ark-ui/*` — direct, transitive, aliased, `export *`, and import-then-reexport chains — so wrapped imports migrate
    too.
  - React skips an element that already has a `render` prop rather than emitting two.
- Resolve Ark parts reached through factory wrappers, not just re-exports. A local `styled(ark.button)` component, a
  `forwardRef`/function wrapper that renders one, and chains of these across files (following path aliases via the
  nearest `tsconfig.json`) now count as Ark components, so `<Button asChild>` migrates when `Button` bottoms out at an
  `@ark-ui/*` part. In-file wrappers are recognised without `--cross-file`; wrapper chains that cross files need it.
