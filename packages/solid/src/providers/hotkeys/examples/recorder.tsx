import { useHotkeyRecorder } from '@ark-ui/solid/hotkeys'
import { Show, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

export const Recorder = () => {
  const [binding, setBinding] = createSignal<string | null>(null)
  const [lastEvent, setLastEvent] = createSignal<string | null>(null)

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
    <div class={styles.Panel}>
      <p class={styles.Hint}>
        Click record, then press a shortcut. <kbd class={styles.Kbd}>Esc</kbd> cancels,{' '}
        <kbd class={styles.Kbd}>Backspace</kbd> clears.
      </p>

      <div class={styles.Toolbar}>
        <button
          type="button"
          class={button.Root}
          onClick={() => recorder.start()}
          disabled={recorder.state().recording}
        >
          {recorder.state().recording ? 'Listening…' : 'Record shortcut'}
        </button>
        <Show when={recorder.state().recording}>
          <span class={styles.Badge} data-state="active">
            <span class={styles.Dot} data-pulse="" />
            {recorder.state().value?.display ?? 'Press a key'}
          </span>
        </Show>
      </div>

      <div class={styles.Section}>
        <span class={styles.SectionLabel}>Bound to</span>
        <div class={styles.KeyStrip}>
          <Show when={binding()} fallback={<span class={styles.Placeholder}>nothing yet</span>}>
            <kbd class={styles.Kbd} data-active="">
              {binding()}
            </kbd>
          </Show>
        </div>
      </div>

      <div class={styles.Section}>
        <span class={styles.SectionLabel}>Last event</span>
        <span class={styles.Badge}>{lastEvent() ?? 'none'}</span>
      </div>
    </div>
  )
}
