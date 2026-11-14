---
'@ark-ui/vue': patch
---

All `use*` composables now accept a getter for their props (`MaybeRefOrGetter`), so reactive values can be passed
without `computed` or object getters:

```ts
const combobox = useCombobox(() => ({
  collection: collection.value,
  onInputValueChange: ({ inputValue }) => filter(inputValue),
}))
```

Plain objects, `ref`s and `computed`s keep working.
