import { createHotkeyStore, useFormatHotkey, useHotkeys } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const commands = [
  { id: 'bold', hotkey: 'mod+B', label: 'Bold', scope: 'editor' },
  { id: 'print', hotkey: 'mod+P', label: 'Print', scope: 'reader' },
]

const store = createHotkeyStore({ activeScopes: ['editor'] })

export const Scopes = () => {
  const formatHotkey = useFormatHotkey()
  const [scope, setScope] = useState('editor')
  const [fired, setFired] = useState<string | null>(null)

  useHotkeys({
    commands: commands.map((command) => ({
      id: command.id,
      hotkey: command.hotkey,
      scopes: [command.scope],
      action: () => setFired(command.id),
    })),
    store,
  })

  const toggle = () => {
    const next = scope === 'editor' ? 'reader' : 'editor'
    setScope(next)
    setFired(null)
    store.setScope(next)
  }

  return (
    <div className={styles.Panel}>
      <p className={styles.Hint}>Only commands in the active scope respond</p>

      <div className={styles.Toolbar}>
        <button type="button" className={button.Root} onClick={toggle}>
          Switch scope
        </button>
        <span className={styles.Badge} data-state="active">
          {scope}
        </span>
      </div>

      <ul className={styles.List}>
        {commands.map((command) => {
          const active = command.scope === scope
          return (
            <li className={styles.Row} key={command.id} data-fired={command.id === fired ? '' : undefined}>
              <span style={{ opacity: active ? 1 : 0.45 }}>
                {command.label} <span className={styles.MetricLabel}>· {command.scope}</span>
              </span>
              <kbd className={styles.Kbd} data-active={command.id === fired ? '' : undefined}>
                {formatHotkey(command.hotkey)}
              </kbd>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
