import '../../../src/components/progress/index.js'

import styles from 'styles/progress.module.css'

const linear = (attrs: string) => `
  <ark-progress class="${styles.Root}" ${attrs}>
    <ark-progress-label class="${styles.Label}">Label</ark-progress-label>
    <ark-progress-value-text class="${styles.ValueText}"></ark-progress-value-text>
    <ark-progress-track class="${styles.Track}">
      <ark-progress-range class="${styles.Range}"></ark-progress-range>
    </ark-progress-track>
  </ark-progress>`

export function mount(root: HTMLElement) {
  root.innerHTML = linear('default-value=""')
}
