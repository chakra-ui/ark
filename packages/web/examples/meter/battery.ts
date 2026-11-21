import { createElement, Zap } from 'lucide'

import '../../src/components/meter/index.js'

import styles from 'styles/meter.module.css'

export function mount(root: HTMLElement) {
  const icon = createElement(Zap, { 'aria-hidden': 'true' }).outerHTML

  root.innerHTML = /* html */ `
  <ark-meter
    class="${styles.Battery} ${styles.Graded}"
    default-value="18"
    low="20"
    high="50"
    optimum="100"
    aria-label="Battery remaining"
  >
    <ark-meter-track class="${styles.Track}">
      <ark-meter-range class="${styles.Indicator}"></ark-meter-range>
    </ark-meter-track>
    <ark-meter-value-text class="${styles.ValueText}"></ark-meter-value-text>
    ${icon}
  </ark-meter>`
}
