---
'@ark-ui/codemod': patch
---

Fix and harden the `as-child-to-render` transforms.

- Solid's `render` prop takes the same props **function** as `asChild`, so it must be called (`{...props()}`) to spread the part's props. The transform was rewriting `props()` to `props`, which spread the function itself and forwarded nothing (including the child's own content). It is now a pure rename that leaves the callback body untouched.
- The React, Solid and Vue transforms now act only on Ark UI components — elements whose tag resolves to an `@ark-ui/*` import (following aliases) — instead of any element that happens to use `asChild`, so a Radix or other library's `asChild` in the same file is left alone. The Svelte transform keys off the Ark-specific `asChild` snippet name.
- A `--cross-file` flag (React and Solid) resolves Ark parts imported through local barrels/re-exports back to `@ark-ui/*` — direct, transitive, aliased, `export *`, and import-then-reexport chains — so wrapped imports migrate too.
- React skips an element that already has a `render` prop rather than emitting two.
