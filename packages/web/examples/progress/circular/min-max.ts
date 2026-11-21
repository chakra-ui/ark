import '../../../src/components/progress/index.js'

import styles from 'styles/progress-circular.module.css'

const circular = (attrs: string, { label = false } = {}) => /* html */ `
  <ark-progress class="${styles.Root}" ${attrs}>
    ${label ? /* html */ `<ark-progress-label class="${styles.Label}">Label</ark-progress-label>` : ''}
    <div class="${styles.CircleContainer}">
      <ark-progress-circle>
        <svg class="${styles.Circle}">
          <circle class="${styles.CircleTrack}"></circle>
          <circle class="${styles.CircleRange}"></circle>
        </svg>
      </ark-progress-circle>
      <ark-progress-value-text class="${styles.ValueText}"></ark-progress-value-text>
    </div>
  </ark-progress>`

export function mount(root: HTMLElement) {
  root.innerHTML = circular('default-value="20" min="10" max="30"')
}
