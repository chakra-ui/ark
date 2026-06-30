---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

- **Number Input**: Add `largeStep` and `smallStep` props for configurable keyboard stepping. Hold `Shift` for
  `largeStep` (defaults to `10 * step`), `Alt` for `smallStep` (defaults to `step / 10`). The defaults match the
  previous behavior.

  ```jsx
  <NumberInput.Root largeStep={20} smallStep={0.5} />
  ```

- **Slider**: Add `largeStep` prop, applied on `Shift` or `PageUp`/`PageDown` (defaults to `10 * step`). The default
  matches the previous behavior.
