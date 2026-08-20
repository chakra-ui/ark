import { HotkeysProvider, useFormatHotkey, useHotkeyStore, useHotkeys } from '@ark-ui/solid/hotkeys'
import { For, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const commands = [
  { id: 'bold', hotkey: 'mod+B', label: 'Bold', scope: 'editor' },
  { id: 'print', hotkey: 'mod+P', label: 'Print', scope: 'reader' },
]

const ScopeDemo = () => {
  const store = useHotkeyStore()
  const formatHotkey = useFormatHotkey()
  const [scope, setScope] = createSignal('editor')
  const [fired, setFired] = createSignal<string | null>(null)

  useHotkeys(
    commands.map((command) => ({
      id: command.id,
      hotkey: command.hotkey,
      scopes: [command.scope],
      action: () => setFired(command.id),
    })),
  )

  const toggle = () => {
    const next = scope() === 'editor' ? 'reader' : 'editor'
    setScope(next)
    setFired(null)
    store.setScope(next)
  }

  return (
    <div class={styles.Panel}>
      <p class={styles.Hint}>Only commands in the active scope respond</p>

      <div class={styles.Toolbar}>
        <button type="button" class={button.Root} onClick={toggle}>
          Switch scope
        </button>
        <span class={styles.Badge} data-state="active">
          {scope()}
        </span>
      </div>

      <ul class={styles.List}>
        <For each={commands}>
          {(command) => (
            <li class={styles.Row} data-fired={command.id === fired() ? '' : undefined}>
              <span style={{ opacity: command.scope === scope() ? 1 : 0.45 }}>
                {command.label} <span class={styles.MetricLabel}>· {command.scope}</span>
              </span>
              <kbd class={styles.Kbd} data-active={command.id === fired() ? '' : undefined}>
                {formatHotkey(command.hotkey)}
              </kbd>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

export const Scopes = () => (
  <HotkeysProvider activeScopes={['editor']}>
    <ScopeDemo />
  </HotkeysProvider>
)
