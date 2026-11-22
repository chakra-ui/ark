import '@ark-ui/web/color-picker'

import styles from 'styles/color-picker.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-color-picker class="${styles.Root}" disabled default-value="#eb5e41">
  <ark-color-picker-label class="${styles.Label}">Color</ark-color-picker-label>
  <ark-color-picker-control class="${styles.Control}">
    <ark-color-picker-channel-input channel="hex"><input class="${styles.Input}" /></ark-color-picker-channel-input>
    <ark-color-picker-trigger>
      <button class="${styles.Trigger}">
        <span class="${styles.Swatch}">
      <ark-color-picker-transparency-grid class="${styles.TransparencyGrid}"></ark-color-picker-transparency-grid>
      <ark-color-picker-value-swatch class="${styles.ValueSwatch}"></ark-color-picker-value-swatch>
    </span>
      </button>
    </ark-color-picker-trigger>
  </ark-color-picker-control>
  <ark-color-picker-hidden-input></ark-color-picker-hidden-input>
  </ark-color-picker>`
}
