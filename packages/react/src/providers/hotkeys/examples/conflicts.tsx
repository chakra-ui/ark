import {
  type ConflictBehavior,
  type HotkeyStore,
  createHotkeyStore,
  useHotkeyRegistrations,
  useHotkeys,
} from '@ark-ui/react/hotkeys'
import { useMemo, useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const BEHAVIORS: ConflictBehavior[] = ['warn', 'replace', 'allow']

const Demo = ({ store }: { store: HotkeyStore }) => {
  const [fired, setFired] = useState<string[]>([])

  useHotkeys({
    commands: [
      { id: 'first', hotkey: 'mod+K', action: () => setFired((log) => [...log, 'First']), label: 'First' },
      { id: 'second', hotkey: 'mod+K', action: () => setFired((log) => [...log, 'Second']), label: 'Second' },
    ],
    store,
  })

  const commands = useHotkeyRegistrations({ store })

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

  // Conflict behavior is fixed when the store is created, so switching it makes a new store.
  const store = useMemo(() => createHotkeyStore({ conflictBehavior: behavior }), [behavior])

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

      <Demo key={behavior} store={store} />
    </div>
  )
}
