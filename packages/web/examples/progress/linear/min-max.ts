import '../../../src/components/progress/index.js'

import styles from 'styles/progress.module.css'

const linear = ({ defaultValue, min, max }: { defaultValue: number; min: number; max: number }) => /* html */ `
  <ark-progress class="${styles.Root}" default-value="${defaultValue}" min="${min}" max="${max}">
    <ark-progress-label class="${styles.Label}">Label</ark-progress-label>
    <ark-progress-value-text class="${styles.ValueText}"></ark-progress-value-text>
    <ark-progress-track class="${styles.Track}">
      <ark-progress-range class="${styles.Range}"></ark-progress-range>
    </ark-progress-track>
  </ark-progress>`

export function mount(root: HTMLElement) {
  root.innerHTML = linear({ defaultValue: 20, min: 10, max: 30 })
}
