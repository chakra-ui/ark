---
'@ark-ui/react': major
'@ark-ui/solid': major
'@ark-ui/svelte': major
'@ark-ui/vue': major
---

Replace `data-scope` and `data-part` with a single attribute per part.

`data-scope="popover" data-part="trigger"` is now `data-popover-trigger`. The attribute comes from zag's anatomy
rather than from a wrapper in Ark, so it stays in step with the machine.

Selectors written against the old pair need updating:

```diff
- [data-scope='popover'][data-part='trigger'] { }
+ [data-popover-trigger] { }
```
