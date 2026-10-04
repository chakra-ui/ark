import { useFormatHotkey, useHotkey } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import styles from 'styles/hotkeys.module.css'

export const Basic = () => {
  const [count, setCount] = useState(0)
  const formatHotkey = useFormatHotkey()

  useHotkey({ hotkey: 'mod+K', action: () => setCount((value) => value + 1) })

  return (
    <div className={styles.Panel}>
      <p className={styles.Hint}>
        Press <kbd className={styles.Kbd}>{formatHotkey('mod+K')}</kbd> anywhere on this page
      </p>
      <div className={styles.Metric}>
        <span className={styles.MetricValue}>{count}</span>
        <span className={styles.MetricLabel}>{count === 1 ? 'time' : 'times'}</span>
      </div>
    </div>
  )
}
