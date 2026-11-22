import type { ProgressElement } from '@ark-ui/web/progress'

import '@ark-ui/web/progress'

import styles from 'styles/progress-circular.module.css'

const element = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host.firstElementChild as HTMLElement
}

export function mount(root: HTMLElement) {
  const progressEl = element(/* html */ `
  <ark-progress class="${styles.Root}" value="42">
    <div class="${styles.CircleContainer}">
      <ark-progress-circle>
        <svg class="${styles.Circle}">
          <circle class="${styles.CircleTrack}"></circle>
          <circle class="${styles.CircleRange}"></circle>
        </svg>
      </ark-progress-circle>
      <ark-progress-value-text class="${styles.ValueText}"></ark-progress-value-text>
    </div>
  </ark-progress>`) as ProgressElement
  progressEl.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    progressEl.setAttribute('value', value == null ? '' : String(value))
  })
  root.replaceChildren(progressEl)
}
