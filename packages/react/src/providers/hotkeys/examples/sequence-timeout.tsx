import { HotkeysProvider, useHotkey } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import styles from 'styles/hotkeys.module.css'

const TIMEOUT_MS = 600

const Demo = () => {
  const [completed, setCompleted] = useState(0)

  useHotkey('G > H', () => setCompleted((value) => value + 1))

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

export const SequenceTimeout = () => (
  <HotkeysProvider sequenceTimeoutMs={TIMEOUT_MS}>
    <Demo />
  </HotkeysProvider>
)
