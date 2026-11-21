import type { ProgressElement } from '../../../src/components/progress/index.js'

import '../../../src/components/progress/index.js'

import styles from 'styles/progress.module.css'

const element = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host.firstElementChild as HTMLElement
}

const linear = (attrs: string) => `
  <ark-progress class="${styles.Root}" ${attrs}>
    <ark-progress-label class="${styles.Label}">Label</ark-progress-label>
    <ark-progress-value-text class="${styles.ValueText}"></ark-progress-value-text>
    <ark-progress-track class="${styles.Track}">
      <ark-progress-range class="${styles.Range}"></ark-progress-range>
    </ark-progress-track>
  </ark-progress>`

export function mount(root: HTMLElement) {
  const progressEl = element(linear('value="42"')) as ProgressElement
  progressEl.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    progressEl.setAttribute('value', value == null ? '' : String(value))
  })
  root.replaceChildren(progressEl)
}
