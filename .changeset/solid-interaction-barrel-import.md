---
'@ark-ui/solid': patch
---

Fix the Solid build failing to resolve the `interaction` provider barrel. The providers index still imported
`./interaction/index.ts` after the file was renamed to `index.tsx`, so `bun run build` aborted with an unresolved
import.
