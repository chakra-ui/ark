import { HotkeysProvider, useHotkey } from '@ark-ui/solid/hotkeys'
import { createSignal } from 'solid-js'
import styles from 'styles/hotkeys.module.css'

const TIMEOUT_MS = 600

const Demo = () => {
  const [completed, setCompleted] = createSignal(0)

  useHotkey('G > H', () => setCompleted((value) => value + 1))

  return (
    <div class={styles.Panel}>
      <p class={styles.Hint}>
        Press <kbd class={styles.Kbd}>G</kbd> then <kbd class={styles.Kbd}>H</kbd>. The second key must land within{' '}
        {TIMEOUT_MS}ms, otherwise the sequence resets and nothing fires.
      </p>

      <div class={styles.Metric}>
        <span class={styles.MetricValue}>{completed()}</span>
        <span class={styles.MetricLabel}>{completed() === 1 ? 'completion' : 'completions'}</span>
      </div>

      <div class={styles.Section}>
        <span class={styles.SectionLabel}>sequenceTimeoutMs</span>
        <span class={styles.Badge}>{TIMEOUT_MS}ms</span>
      </div>
    </div>
  )
}

export const SequenceTimeout = () => (
  <HotkeysProvider sequenceTimeoutMs={TIMEOUT_MS}>
    <Demo />
  </HotkeysProvider>
)
