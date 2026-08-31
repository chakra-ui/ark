import { useHotkeyRecorder } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

export const Recorder = () => {
  const [binding, setBinding] = useState<string | null>(null)
  const [lastEvent, setLastEvent] = useState<string | null>(null)

  const recorder = useHotkeyRecorder({
    onRecord: (hotkey) => {
      setBinding(hotkey.display)
      setLastEvent('recorded')
    },
    onCancel: () => setLastEvent('cancelled'),
    onClear: () => {
      setBinding(null)
      setLastEvent('cleared')
    },
  })

  return (
    <div className={styles.Panel}>
      <p className={styles.Hint}>
        Click record, then press a shortcut. <kbd className={styles.Kbd}>Esc</kbd> cancels,{' '}
        <kbd className={styles.Kbd}>Backspace</kbd> clears.
      </p>

      <div className={styles.Toolbar}>
        <button type="button" className={button.Root} onClick={() => recorder.start()} disabled={recorder.recording}>
          {recorder.recording ? 'Listening…' : 'Record shortcut'}
        </button>
        {recorder.recording && (
          <span className={styles.Badge} data-state="active">
            <span className={styles.Dot} data-pulse="" />
            {recorder.value?.display ?? 'Press a key'}
          </span>
        )}
      </div>

      <div className={styles.Section}>
        <span className={styles.SectionLabel}>Bound to</span>
        <div className={styles.KeyStrip}>
          {binding ? (
            <kbd className={styles.Kbd} data-active="">
              {binding}
            </kbd>
          ) : (
            <span className={styles.Placeholder}>nothing yet</span>
          )}
        </div>
      </div>

      <div className={styles.Section}>
        <span className={styles.SectionLabel}>Last event</span>
        <span className={styles.Badge}>{lastEvent ?? 'none'}</span>
      </div>
    </div>
  )
}
