---
'@ark-ui/svelte': patch
---

- Fix `Portal` leaving its content in the DOM when unmounted immediately after mounting.
- Fix `Portal` not moving its content when the `container` prop changes.
