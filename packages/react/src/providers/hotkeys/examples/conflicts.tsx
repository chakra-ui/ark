import { type ConflictBehavior, HotkeysProvider, useHotkeyRegistrations, useHotkeys } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const BEHAVIORS: ConflictBehavior[] = ['warn', 'replace', 'allow']

const Demo = () => {
  const [fired, setFired] = useState<string[]>([])

  useHotkeys([
    { id: 'first', hotkey: 'mod+K', action: () => setFired((log) => [...log, 'First']), label: 'First' },
    { id: 'second', hotkey: 'mod+K', action: () => setFired((log) => [...log, 'Second']), label: 'Second' },
  ])

  const commands = useHotkeyRegistrations()

  return (
    <>
      <div className={styles.Section}>
        <span className={styles.SectionLabel}>Registered on mod+K</span>
        <div className={styles.KeyStrip}>
          {commands.length === 0 ? (
            <span className={styles.Placeholder}>none</span>
          ) : (
            commands.map((command) => (
              <span className={styles.Badge} key={command.id}>
                {command.label}
              </span>
            ))
          )}
        </div>
      </div>

      <div className={styles.Section}>
        <span className={styles.SectionLabel}>Fired on last press</span>
        <span className={styles.Badge} data-state={fired.length > 0 ? 'active' : undefined}>
          {fired.slice(-2).join(' + ') || 'nothing yet'}
        </span>
      </div>
    </>
  )
}

export const Conflicts = () => {
  const [behavior, setBehavior] = useState<ConflictBehavior>('warn')

  return (
    <div className={styles.Panel}>
      <p className={styles.Hint}>
        Two commands claim the same shortcut. Pick how the store resolves it, then press it.
      </p>

      <div className={styles.Toolbar}>
        {BEHAVIORS.map((value) => (
          <button
            type="button"
            className={button.Root}
            key={value}
            onClick={() => setBehavior(value)}
            data-selected={value === behavior ? '' : undefined}
          >
            {value}
          </button>
        ))}
      </div>

      <HotkeysProvider key={behavior} conflictBehavior={behavior}>
        <Demo />
      </HotkeysProvider>
    </div>
  )
}
