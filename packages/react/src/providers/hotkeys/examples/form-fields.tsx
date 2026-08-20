import { useFormatHotkey, useHotkeys } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import styles from 'styles/hotkeys.module.css'

export const FormFields = () => {
  const [log, setLog] = useState<string | null>(null)
  const formatHotkey = useFormatHotkey()

  useHotkeys([
    { id: 'search', hotkey: 'S', action: () => setLog('Search (single key)') },
    { id: 'save', hotkey: 'mod+S', action: () => setLog('Save (modifier)') },
    {
      id: 'preview',
      hotkey: 'P',
      action: () => setLog('Preview (opted in)'),
      options: { enableOnFormTags: true },
    },
  ])

  return (
    <div className={styles.Panel}>
      <p className={styles.Hint}>Try each shortcut outside the field, then again with the field focused</p>

      <input className={styles.Input} placeholder="Type here…" aria-label="Note" />

      <ul className={styles.List}>
        <li className={styles.Row}>
          <span>
            Search <span className={styles.MetricLabel}>· ignored while typing</span>
          </span>
          <kbd className={styles.Kbd}>{formatHotkey('S')}</kbd>
        </li>
        <li className={styles.Row}>
          <span>
            Save <span className={styles.MetricLabel}>· modifiers always fire</span>
          </span>
          <kbd className={styles.Kbd}>{formatHotkey('mod+S')}</kbd>
        </li>
        <li className={styles.Row}>
          <span>
            Preview <span className={styles.MetricLabel}>· enableOnFormTags</span>
          </span>
          <kbd className={styles.Kbd}>{formatHotkey('P')}</kbd>
        </li>
      </ul>

      <div className={styles.Section}>
        <span className={styles.SectionLabel}>Last fired</span>
        <span className={styles.Badge} data-state={log ? 'active' : undefined}>
          {log ?? 'nothing yet'}
        </span>
      </div>
    </div>
  )
}
