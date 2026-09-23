---
'@ark-ui/svelte': patch
---

Export the `Fieldset` namespace's prop types under their namespaced names. Every other Svelte namespace aliases them —
`Field.RootProps`, `Dialog.RootProps`, `Accordion.ItemProps` and so on — but `fieldset.ts` re-exported the flat
`FieldsetRootProps` / `FieldsetLegendProps` names, so `Fieldset.RootProps` and its siblings did not resolve and the
`BaseProps` variants were not exported at all. This matches the React package, whose `Fieldset` namespace already
aliases both.
