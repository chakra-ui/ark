---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/vue': patch
'@ark-ui/svelte': patch
---

- **Select**: Export `SelectIntlTranslations`, `SelectPositioningOptions`, `SelectScrollToIndexDetails` and
  `SelectSelectionDetails`.
- **Clipboard**: Export `ClipboardValueChangeDetails`.
- **DateInput**: Export `DateInputPlaceholderChangeDetails`.
- **ImageCropper**: Export `ImageCropperRect`.
- **QrCode**: Export `QrCodeValueChangeDetails`.
- **Steps**: Export `StepInvalidDetails`.

In Vue, this fixes TS2883 ("cannot be named without a reference to …") when emitting declarations for a component that
wraps one of these roots, for example a generic `Select.Root` wrapper built with pnpm.
