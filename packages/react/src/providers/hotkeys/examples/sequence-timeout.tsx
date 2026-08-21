import { createHotkeyStore, useHotkey } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import styles from 'styles/hotkeys.module.css'

const TIMEOUT_MS = 600

const store = createHotkeyStore({ sequenceTimeoutMs: TIMEOUT_MS })

export const SequenceTimeout = () => {
  const [completed, setCompleted] = useState(0)

  useHotkey({ hotkey: 'G > H', action: () => setCompleted((value) => value + 1), store })

  return (
    <div className={styles.Panel}>
      <p className={styles.Hint}>
        Press <kbd className={styles.Kbd}>G</kbd> then <kbd className={styles.Kbd}>H</kbd>. The second key must land
        within {TIMEOUT_MS}ms, otherwise the sequence resets and nothing fires.
      </p>

      <div className={styles.Metric}>
        <span className={styles.MetricValue}>{completed}</span>
        <span className={styles.MetricLabel}>{completed === 1 ? 'completion' : 'completions'}</span>
      </div>

      <div className={styles.Section}>
        <span className={styles.SectionLabel}>sequenceTimeoutMs</span>
        <span className={styles.Badge}>{TIMEOUT_MS}ms</span>
      </div>
    </div>
  )
}
