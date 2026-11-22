import '@ark-ui/web/meter'

import styles from 'styles/meter.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-meter class="${styles.Root}" default-value="24">
    <ark-meter-label class="${styles.Label}">Storage used</ark-meter-label>
    <ark-meter-value-text class="${styles.ValueText}"></ark-meter-value-text>
    <ark-meter-track class="${styles.Track}">
      <ark-meter-range class="${styles.Indicator}"></ark-meter-range>
    </ark-meter-track>
  </ark-meter>`
}
