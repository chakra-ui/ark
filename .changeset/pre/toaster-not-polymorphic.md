---
'@ark-ui/react': major
'@ark-ui/solid': major
'@ark-ui/svelte': major
'@ark-ui/vue': major
---

**Breaking:** `Toaster` no longer accepts `render` or `asChild`, and `ToasterState` is gone.

`Toaster`'s children belong to the machine (one actor per toast), not the consumer, so `render` handed over an element
whose children had to be passed through untouched — and every framework broke that differently, silently dropping the
toasts.

Style the group with CSS instead: it already carries `data-placement`, `data-side` and `data-align`. To wrap the toasts
in your own element, put that element around `Toaster`.
