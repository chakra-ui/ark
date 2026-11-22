import { createElement, Pipette } from 'lucide'

import '@ark-ui/web/color-picker'

import styles from 'styles/color-picker.module.css'

const icon = (node: typeof Pipette) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-color-picker class="${styles.Root}" default-value="#eb5e41">
  <ark-color-picker-label class="${styles.Label}">Color</ark-color-picker-label>
  <ark-color-picker-control class="${styles.Control}">
    <ark-color-picker-value-swatch class="${styles.Swatch}"></ark-color-picker-value-swatch>
    <ark-color-picker-channel-input channel="hex"><input class="${styles.Input}" /></ark-color-picker-channel-input>
    <ark-color-picker-eye-dropper-trigger>
      <button class="${styles.EyeDropperTrigger}">${icon(Pipette)}</button>
    </ark-color-picker-eye-dropper-trigger>
  </ark-color-picker-control>
  <ark-color-picker-hidden-input></ark-color-picker-hidden-input>
  </ark-color-picker>`
}
