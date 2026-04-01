---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **File Upload**: Automatically reject duplicate files with `FILE_EXISTS` error. Previously, uploading the same file
  twice was silently accepted and deleting one duplicate removed all of them.
