---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

Migrate the `Presence` and Svelte `Menu` parts off the legacy `data-scope`/`data-part` attributes. `Presence` now renders the unified `data-presence-root` attribute, and the Svelte `Menu.Separator`/`Menu.Trigger` parts drop the redundant hardcoded attributes in favour of the ones Zag emits (`data-menu-separator`, `data-menu-trigger`).
