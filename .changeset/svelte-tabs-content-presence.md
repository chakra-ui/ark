---
'@ark-ui/svelte': patch
---

Fix `Tabs.Content` omitting the presence props. The content merged only the machine props, so it never carried
`data-state="open" | "closed"` (the React, Solid and Vue implementations do) and it was hidden the moment the tab
changed, cutting exit animations short.
