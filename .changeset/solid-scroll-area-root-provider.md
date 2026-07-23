---
'@ark-ui/solid': patch
---

- **Scroll Area**: Fixed `RootProvider` throwing `useScrollAreaContext returned undefined` by evaluating children outside the provider, and merge `getRootProps()` onto the root element.
- **Password Input**: Fixed `RootProvider` spreading the machine `value` onto the root DOM element.
- **Steps**: Fixed `RootProvider` rendering children twice via both `mergedProps` and explicit `{props.children}`.
- **Marquee**: Fixed `Content` merging `children` into every cloned content element's props.
