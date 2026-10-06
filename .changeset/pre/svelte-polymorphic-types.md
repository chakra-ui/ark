---
'@ark-ui/svelte': patch
---

- Fix the `asChild` props function rejecting an SVG child. It returned `HTMLAttributes<HTMLElement>`, whose event
  handlers don't accept an `SVGElement`, so `<svg {...props()}>` failed to typecheck without a cast. It now returns
  attributes any element accepts, which keeps spreading a part's props onto a different element (a trigger rendered as
  `<a>`) working.
- Export `HTMLProps`, `HTMLTag`, `PolymorphicProps`, `PropsFn` and `RefAttribute`, so wrappers can type their own
  polymorphic props the way `@ark-ui/react` exports `HTMLArkProps` and `PolymorphicProps`.
