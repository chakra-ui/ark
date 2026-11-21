---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **FileUpload**: Fixed `FileUpload.ItemPreviewImage` revoking its blob URL on every re-render, which caused intermittent `ERR_FILE_NOT_FOUND` requests. The URL is now recreated only when the file changes.
