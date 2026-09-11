---
'@ark-ui/codemod': patch
---

Fix the Solid `as-child-to-render` transform. Solid's `render` prop takes the same props **function** as `asChild`, so it must be called (`{...props()}`) to spread the part's props. The transform was rewriting `props()` to `props`, which spread the function itself and forwarded nothing (including the child's own content). It is now a pure rename that leaves the callback body untouched.
