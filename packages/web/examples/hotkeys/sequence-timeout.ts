import { createHotkey, createHotkeyStore } from '@ark-ui/web/hotkeys'

import styles from 'styles/hotkeys.module.css'

const TIMEOUT_MS = 600

const store = createHotkeyStore({ sequenceTimeoutMs: TIMEOUT_MS })

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <p class="${styles.Hint}">
      Press <kbd class="${styles.Kbd}">G</kbd> then <kbd class="${styles.Kbd}">H</kbd>. The second key must land
      within ${TIMEOUT_MS}ms, otherwise the sequence resets and nothing fires.
    </p>

    <div class="${styles.Metric}">
      <span class="${styles.MetricValue}">0</span>
      <span class="${styles.MetricLabel}">completions</span>
    </div>

    <div class="${styles.Section}">
      <span class="${styles.SectionLabel}">sequenceTimeoutMs</span>
      <span class="${styles.Badge}">${TIMEOUT_MS}ms</span>
    </div>
  </div>`

  const value = root.querySelector(`.${styles.MetricValue}`)!
  const label = root.querySelector(`.${styles.MetricLabel}`)!

  let completed = 0

  createHotkey(
    'G > H',
    () => {
      completed += 1
      value.textContent = String(completed)
      label.textContent = completed === 1 ? 'completion' : 'completions'
    },
    { id: 'complete', store },
  )
}
