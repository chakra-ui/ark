import type { ProgressElement } from '../../../src/components/progress/index.js'

import '../../../src/components/progress/index.js'

import styles from 'styles/progress-circular.module.css'

const element = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host.firstElementChild as HTMLElement
}

const circular = (attrs: string, { label = false } = {}) => `
  <ark-progress class="${styles.Root}" ${attrs}>
    ${label ? `<ark-progress-label class="${styles.Label}">Label</ark-progress-label>` : ''}
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
  const progressEl = element(circular('value="42"')) as ProgressElement
  progressEl.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    progressEl.setAttribute('value', value == null ? '' : String(value))
  })
  root.replaceChildren(progressEl)
}
