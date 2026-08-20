import { useHotkey, useIsKeyPressed, usePressedKeys } from '@ark-ui/react/hotkeys'
import styles from 'styles/hotkeys.module.css'

export const KeyState = () => {
  useHotkey('mod+K', () => {})

  const pressedKeys = usePressedKeys()
  const isShiftPressed = useIsKeyPressed('shift')

  return (
    <div className={styles.Panel}>
      <p className={styles.Hint}>Hold any key to see it tracked live</p>

      <div className={styles.Section}>
        <span className={styles.SectionLabel}>Currently pressed</span>
        <div className={styles.KeyStrip}>
          {pressedKeys.length === 0 ? (
            <span className={styles.Placeholder}>nothing</span>
          ) : (
            pressedKeys.map((key) => (
              <kbd className={styles.Kbd} key={key} data-active="">
                {key}
              </kbd>
            ))
          )}
        </div>
      </div>

      <div className={styles.Section}>
        <span className={styles.SectionLabel}>Shift</span>
        <span className={styles.Badge} data-state={isShiftPressed ? 'active' : undefined}>
          <span className={styles.Dot} data-pulse={isShiftPressed ? '' : undefined} />
          {isShiftPressed ? 'Precision mode' : 'Hold Shift for precision'}
        </span>
      </div>
    </div>
  )
}
