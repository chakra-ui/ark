import '../../src/components/angle-slider/index.js'

import styles from 'styles/angle-slider.module.css'

const markers = [0, 45, 90, 135, 180, 225, 270, 315]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-angle-slider class="${styles.Root}">
    <ark-angle-slider-label class="${styles.Label}">Rotation</ark-angle-slider-label>
    <ark-angle-slider-control class="${styles.Control}">
      <ark-angle-slider-marker-group class="${styles.MarkerGroup}">
        ${markers
          .map(
            (value) =>
              /* html */ `<ark-angle-slider-marker class="${styles.Marker}" value="${value}"></ark-angle-slider-marker>`,
          )
          .join('')}
      </ark-angle-slider-marker-group>
      <ark-angle-slider-thumb class="${styles.Thumb}"></ark-angle-slider-thumb>
    </ark-angle-slider-control>
    <ark-angle-slider-value-text class="${styles.ValueText}"></ark-angle-slider-value-text>
    <ark-angle-slider-hidden-input></ark-angle-slider-hidden-input>
  </ark-angle-slider>`
}
