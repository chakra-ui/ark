import { useFormatHotkey, useHotkeys, usePlatform } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import styles from 'styles/hotkeys.module.css'

const commands = [
  { id: 'save', hotkey: 'mod+S', label: 'Save', category: 'File' },
  { id: 'undo', hotkey: 'mod+Z', label: 'Undo', category: 'Edit' },
  { id: 'redo', hotkey: 'mod+shift+Z', label: 'Redo', category: 'Edit' },
]

export const Multiple = () => {
  const [lastFired, setLastFired] = useState<string | null>(null)
  const platform = usePlatform()
  const formatHotkey = useFormatHotkey()

  useHotkeys({ commands: commands.map((command) => ({ ...command, action: () => setLastFired(command.id) })) })

  return (
    <div className={styles.Panel}>
      <div className={styles.Toolbar}>
        <span className={styles.SectionLabel}>Detected platform</span>
        <span className={styles.Badge}>{platform}</span>
      </div>
      <ul className={styles.List}>
        {commands.map((command) => (
          <li className={styles.Row} key={command.id} data-fired={command.id === lastFired ? '' : undefined}>
            <span>{command.label}</span>
            <kbd className={styles.Kbd} data-active={command.id === lastFired ? '' : undefined}>
              {formatHotkey(command.hotkey)}
            </kbd>
          </li>
        ))}
      </ul>
    </div>
  )
}
