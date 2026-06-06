---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **Date Input**: Fix segment placeholders for locales with explicit script subtags.

- **Drawer**: Fix flickering when a controlled drawer is swiped or backdrop-closed while the `open` setter is async
  (e.g. the History API or a delayed state update).

- **Image Cropper**: Fix `getCroppedImage` and `getCropData` returning the wrong region when the image is shown at a
  size different from its natural resolution (e.g. `width` / `height` of `100%`).

- **Pin Input**: Fix `data-filled` being set on every input on first render.

- **Signature Pad**: Fix the `dir` prop being accepted but never forwarded to the DOM.
