import '../../../src/components/progress/index.js'

import styles from 'styles/progress-circular.module.css'

const circular = ({ defaultValue, min, max }: { defaultValue: number; min: number; max: number }) => /* html */ `
  <ark-progress class="${styles.Root}" default-value="${defaultValue}" min="${min}" max="${max}">
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
  root.innerHTML = circular({ defaultValue: 20, min: 10, max: 30 })
}
