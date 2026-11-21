import '../../../src/components/progress/index.js'

import styles from 'styles/progress-circular.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-progress class="${styles.Root}" default-value="42">
    
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
}
