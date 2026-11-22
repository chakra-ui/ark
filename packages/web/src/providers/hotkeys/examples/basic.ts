import { createHotkey, formatHotkey } from '@ark-ui/web/hotkeys'

import styles from 'styles/hotkeys.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <p class="${styles.Hint}">
      Press <kbd class="${styles.Kbd}">${formatHotkey('mod+K')}</kbd> anywhere on this page
    </p>
    <div class="${styles.Metric}">
      <span class="${styles.MetricValue}">0</span>
      <span class="${styles.MetricLabel}">times</span>
    </div>
  </div>`

  const value = root.querySelector(`.${styles.MetricValue}`)!
  const label = root.querySelector(`.${styles.MetricLabel}`)!

  let count = 0

  createHotkey(
    'mod+K',
    () => {
      count += 1
      value.textContent = String(count)
      label.textContent = count === 1 ? 'time' : 'times'
    },
    { id: 'basic' },
  )
}
