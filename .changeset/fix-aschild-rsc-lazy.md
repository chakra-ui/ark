---
'@ark-ui/react': patch
---

Fix `asChild` rendering nothing when the child crosses the React Server Components boundary. React's Flight protocol can
hand the child over wrapped in `Symbol(react.lazy)`, which `isValidElement` rejects, so the factory bailed out and
rendered neither the child nor the element it stood in for. The lazy child is now unwrapped before its props are merged.
