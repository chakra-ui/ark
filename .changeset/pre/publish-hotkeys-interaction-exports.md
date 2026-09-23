---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/vue': patch
'@ark-ui/svelte': patch
---

Fix `./hotkeys` and `./interaction` entrypoints missing from the published `exports` map.

The build files shipped, but the publish config (`clean-package`) maintains its own `exports` map and was never updated
when the `hotkeys` and `interaction` primitives were added, so `import { useHotkeys } from '@ark-ui/react/hotkeys'`
failed with `ERR_MODULE_NOT_FOUND`. Both entrypoints are now included in the published map for every framework.
