import { useFormatHotkey, useHotkeys, usePlatform } from '@ark-ui/solid/hotkeys'
import { For, createSignal } from 'solid-js'
import styles from 'styles/hotkeys.module.css'

const commands = [
  { id: 'save', hotkey: 'mod+S', label: 'Save', category: 'File' },
  { id: 'undo', hotkey: 'mod+Z', label: 'Undo', category: 'Edit' },
  { id: 'redo', hotkey: 'mod+shift+Z', label: 'Redo', category: 'Edit' },
]

export const Multiple = () => {
  const [lastFired, setLastFired] = createSignal<string | null>(null)
  const platform = usePlatform()
  const formatHotkey = useFormatHotkey()

  useHotkeys({ commands: commands.map((command) => ({ ...command, action: () => setLastFired(command.id) })) })

  return (
    <div class={styles.Panel}>
      <div class={styles.Toolbar}>
        <span class={styles.SectionLabel}>Detected platform</span>
        <span class={styles.Badge}>{platform()}</span>
      </div>
      <ul class={styles.List}>
        <For each={commands}>
          {(command) => (
            <li class={styles.Row} data-fired={command.id === lastFired() ? '' : undefined}>
              <span>{command.label}</span>
              <kbd class={styles.Kbd} data-active={command.id === lastFired() ? '' : undefined}>
                {formatHotkey(command.hotkey)}
              </kbd>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
