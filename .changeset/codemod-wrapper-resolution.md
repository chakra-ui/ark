---
'@ark-ui/codemod': patch
---

Resolve Ark parts reached through factory wrappers, not just re-exports. A local `styled(ark.button)` component, a `forwardRef`/function wrapper that renders one, and chains of these across files (following path aliases via the nearest `tsconfig.json`) now count as Ark components, so `<Button asChild>` migrates when `Button` bottoms out at an `@ark-ui/*` part. In-file wrappers are recognised without `--cross-file`; wrapper chains that cross files need it.
