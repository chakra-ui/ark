import { createElement, Check } from 'lucide'

import '@ark-ui/web/color-picker'

import styles from 'styles/color-picker.module.css'

const icon = (node: typeof Check) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const swatches = ['red', 'blue', 'green', 'orange']

const swatch = (color: string) => /* html */ `
  <ark-color-picker-swatch-trigger value="${color}">
    <button class="${styles.SwatchTrigger}">
      <ark-color-picker-swatch class="${styles.Swatch}" value="${color}">
        <ark-color-picker-swatch-indicator class="${styles.SwatchIndicator}">${icon(Check)}</ark-color-picker-swatch-indicator>
      </ark-color-picker-swatch>
    </button>
  </ark-color-picker-swatch-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-color-picker class="${styles.Root}" inline default-value="#eb5e41">
  <ark-color-picker-area class="${styles.Area}">
      <ark-color-picker-area-background class="${styles.AreaBackground}"></ark-color-picker-area-background>
      <ark-color-picker-area-thumb class="${styles.AreaThumb}"></ark-color-picker-area-thumb>
    </ark-color-picker-area>
  <ark-color-picker-swatch-group class="${styles.SwatchGroup}">
    ${swatches.map(swatch).join('')}
  </ark-color-picker-swatch-group>
  </ark-color-picker>`
}
