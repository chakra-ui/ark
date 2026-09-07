---
'@ark-ui/solid': major
'@ark-ui/vue': major
'@ark-ui/svelte': major
---

**Breaking:** `useCollator` now returns the collator directly instead of an accessor, so `compare` can be used or
destructured the same way as in React. The collator still follows locale changes.

```diff
- const collator = useCollator()
- collator().compare(a, b)      // Solid, Svelte
- collator.value.compare(a, b)  // Vue
+ const collator = useCollator()
+ collator.compare(a, b)
```
