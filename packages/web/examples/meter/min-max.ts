import type { MeterElement } from '@ark-ui/web/meter'

import '@ark-ui/web/meter'

import styles from 'styles/meter.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-meter class="${styles.Root}" default-value="18" min="-10" max="40">
    <ark-meter-label class="${styles.Label}">Temperature</ark-meter-label>
    <ark-meter-value-text class="${styles.ValueText}"></ark-meter-value-text>
    <ark-meter-track class="${styles.Track}">
      <ark-meter-range class="${styles.Indicator}"></ark-meter-range>
    </ark-meter-track>
  </ark-meter>`

  const meterEl = root.querySelector<MeterElement>('ark-meter')!
  meterEl.formatOptions = {
    style: 'unit',
    unit: 'celsius',
  }
}
