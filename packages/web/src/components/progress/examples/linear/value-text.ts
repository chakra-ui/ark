import type { ProgressElement } from '@ark-ui/web/progress'

import '@ark-ui/web/progress'

import styles from 'styles/progress.module.css'

const element = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host.firstElementChild as HTMLElement
}

export function mount(root: HTMLElement) {
  const progressEl = element(/* html */ `
  <ark-progress class="${styles.Root}">
    <ark-progress-label class="${styles.Label}">Label</ark-progress-label>
    <ark-progress-value-text class="${styles.ValueText}"></ark-progress-value-text>
    <ark-progress-track class="${styles.Track}">
      <ark-progress-range class="${styles.Range}"></ark-progress-range>
    </ark-progress-track>
  </ark-progress>`) as ProgressElement & { translations: unknown }
  progressEl.translations = {
    value({ value, max }: { value: number | null; max: number }) {
      if (value === null) return 'Loading...'
      return `${value} of ${max} items loaded`
    },
  }
  root.replaceChildren(progressEl)
}
