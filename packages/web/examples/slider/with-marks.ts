import '../../src/components/slider/index.js'

import styles from 'styles/slider.module.css'

const marks = [0, 25, 50, 75, 100]

const marker = (value: number) =>
  /* html */ `<ark-slider-marker class="${styles.Marker}" value="${value}">${value}</ark-slider-marker>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-slider class="${styles.Root}" default-value="50">
      <div style="display: flex; justify-content: space-between">
        <ark-slider-label class="${styles.Label}">Label</ark-slider-label>
        <ark-slider-value-text class="${styles.ValueText}"></ark-slider-value-text>
      </div>
      <ark-slider-control class="${styles.Control}">
        <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
        <ark-slider-thumb class="${styles.Thumb}" index="0"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>
      </ark-slider-control>
      <ark-slider-marker-group class="${styles.MarkerGroup}">${marks.map(marker).join('')}</ark-slider-marker-group>
    </ark-slider>`
}
