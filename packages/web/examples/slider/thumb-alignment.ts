import '../../src/components/slider/index.js'

import styles from 'styles/slider.module.css'

const thumb = (index: number, indicator = false) =>
  `<ark-slider-thumb class="${styles.Thumb}" index="${index}">${indicator ? `<ark-slider-dragging-indicator class="${styles.DraggingIndicator}"></ark-slider-dragging-indicator>` : ''}<ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>`

const sliderMarkup = (attrs: string, thumbs: number, extra = '', { valueText = true, indicator = false } = {}) => `
  <ark-slider class="${styles.Root}" ${attrs}>
    ${
      valueText
        ? `<div style="display: flex; justify-content: space-between">
      <ark-slider-label class="${styles.Label}">Label</ark-slider-label>
      <ark-slider-value-text class="${styles.ValueText}"></ark-slider-value-text>
    </div>`
        : `<ark-slider-label class="${styles.Label}">Label</ark-slider-label>`
    }
    <ark-slider-control class="${styles.Control}">
      <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
      ${Array.from({ length: thumbs }, (_, index) => thumb(index, indicator)).join('')}
    </ark-slider-control>
    ${extra}
  </ark-slider>`

export function mount(root: HTMLElement) {
  root.innerHTML = sliderMarkup(`thumb-alignment="center" default-value="50"`, 1)
}
