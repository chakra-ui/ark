---
'@ark-ui/solid': major
'@ark-ui/vue': major
'@ark-ui/svelte': major
---

**Breaking:** `useFilter` now returns the filter methods directly instead of an accessor, so `contains`, `startsWith`,
and `endsWith` can be destructured the same way as in React. The methods still follow locale changes.

Migrate by dropping the accessor call:

```diff
- const filters = useFilter({ sensitivity: 'base' })
- filters().contains(text, query)   // Solid, Svelte
- filters.value.contains(text, query) // Vue
+ const { contains } = useFilter({ sensitivity: 'base' })
+ contains(text, query)
```
