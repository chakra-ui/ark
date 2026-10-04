---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
---

Fix `Tour.Backdrop` staying visible after the tour closes. It only checked whether the current step has a backdrop, so
finishing a tour on a step with one left the backdrop on screen.
