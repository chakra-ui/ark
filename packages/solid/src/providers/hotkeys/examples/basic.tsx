import { useFormatHotkey, useHotkey } from '@ark-ui/solid/hotkeys'
import { createSignal } from 'solid-js'
import styles from 'styles/hotkeys.module.css'

export const Basic = () => {
  const [count, setCount] = createSignal(0)
  const formatHotkey = useFormatHotkey()

  useHotkey({ hotkey: 'mod+K', action: () => setCount((value) => value + 1) })

  return (
    <div class={styles.Panel}>
      <p class={styles.Hint}>
        Press <kbd class={styles.Kbd}>{formatHotkey('mod+K')}</kbd> anywhere on this page
      </p>
      <div class={styles.Metric}>
        <span class={styles.MetricValue}>{count()}</span>
        <span class={styles.MetricLabel}>{count() === 1 ? 'time' : 'times'}</span>
      </div>
    </div>
  )
}
