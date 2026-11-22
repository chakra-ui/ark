import '@ark-ui/web/progress'

import styles from 'styles/progress.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-progress class="${styles.Root}" default-value="42">
    <ark-progress-label class="${styles.Label}">Label</ark-progress-label>
    <ark-progress-value-text class="${styles.ValueText}"></ark-progress-value-text>
    <ark-progress-track class="${styles.Track}">
      <ark-progress-range class="${styles.Range}"></ark-progress-range>
    </ark-progress-track>
  </ark-progress>`
}
