---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

- **Autofocus Control**: Add `data-autofocus` and `data-no-autofocus` to decide what gets focus when an overlay opens.
  Mark chrome like the close button with `data-no-autofocus` to skip it, or mark the real target with `data-autofocus`.

  ```jsx
  <Dialog.Content>
    <Dialog.CloseTrigger data-no-autofocus>Close</Dialog.CloseTrigger>
    <input data-autofocus />
    <button>Save</button>
  </Dialog.Content>
  ```

  Focus goes to `initialFocusEl`, then `[data-autofocus]`, then the first tabbable element without
  `[data-no-autofocus]`, then the content root.

  > Supported in Dialog and Drawer.

- **Focus Trap**: Add `persistentElements` to treat portalled content as part of the trap when it isn't reachable via
  `aria-controls`/`aria-expanded`. Pass getters so the elements can be resolved lazily.

  ```jsx
  <FocusTrap persistentElements={[() => document.getElementById('toast-region')]} />
  ```

- **Image Cropper**: `getCropData()` now returns the exact `corners` and `outputSize` of the crop in natural-image
  pixels, so you can hand the region straight to a server-side cropper.

- **Image Cropper**: Add `maxSize` to `getCroppedImage()` to cap the output dimensions. The crop keeps its aspect ratio
  and scales down to fit.

  ```jsx
  const blob = await imageCropper.getCroppedImage({ maxSize: { width: 512, height: 512 } })
  ```
