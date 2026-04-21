---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **DownloadTrigger**: Extract the download logic into a `useDownload` hook. The `DownloadTrigger` component now simply
  consumes this hook, making the browser-download behavior reusable outside of the trigger component.
