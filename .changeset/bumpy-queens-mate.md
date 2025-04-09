---
'@ark-ui/svelte': minor
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/vue': minor
---

- **Toast**: Add support for queuing toasts that exceed the maximum limit. When the maximum number of toasts is reached:

  - New toasts are added to a queue instead of being dropped
  - Queued toasts are automatically displayed when space becomes available
  - Queue is cleared when all toasts are removed

- **Listbox**

  - Add support for clearing selection on Escape press
  - Add `api.clearHighlightedValue` function to clear the highlighted value
  - Add `data-empty` attribute to indicate when the listbox is empty
  - Fix keyboard navigation when no item is highlighted

- **Collection**: Add `filter` function to collection methods

- **Combobox**:

  - Fallback to trigger element as the positioning anchor
  - Add `data-empty` attribute to the listbox and content to indicate when the listbox is empty
