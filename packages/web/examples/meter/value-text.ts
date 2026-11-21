import type { MeterElement } from '../../src/components/meter/index.js'

import '../../src/components/meter/index.js'

import styles from 'styles/meter.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-meter class="${styles.Root}" default-value="3" max="5">
    <ark-meter-label class="${styles.Label}">Onboarding</ark-meter-label>
    <ark-meter-value-text class="${styles.ValueText}"></ark-meter-value-text>
    <ark-meter-track class="${styles.Track}">
      <ark-meter-range class="${styles.Indicator}"></ark-meter-range>
    </ark-meter-track>
  </ark-meter>`

  const meterEl = root.querySelector<MeterElement>('ark-meter')!
  meterEl.translations = {
    value: ({ value, max }) => `${value} of ${max} tasks`,
  }
}
