---
'@ark-ui/svelte': patch
---

Fix `bind:ref` staying `null` when a part renders through the `render` or `asChild` snippet. The ref now resolves to
the element the snippet spreads `props()` onto, the same as the default element.

The `svelte` peer dependency is now `>=5.29.0`, the first version with attachments. Several parts already relied on
them, so this corrects the range rather than raising the real minimum.
