import { useHotkey, useIsKeyPressed, usePressedKeys } from '@ark-ui/solid/hotkeys'
import { For, Show } from 'solid-js'
import styles from 'styles/hotkeys.module.css'

export const KeyState = () => {
  useHotkey({ hotkey: 'mod+K', action: () => {} })

  const pressedKeys = usePressedKeys()
  const isShiftPressed = useIsKeyPressed({ hotkey: 'shift' })

  return (
    <div class={styles.Panel}>
      <p class={styles.Hint}>Hold any key to see it tracked live</p>

      <div class={styles.Section}>
        <span class={styles.SectionLabel}>Currently pressed</span>
        <div class={styles.KeyStrip}>
          <Show when={pressedKeys().length > 0} fallback={<span class={styles.Placeholder}>nothing</span>}>
            <For each={pressedKeys()}>
              {(key) => (
                <kbd class={styles.Kbd} data-active="">
                  {key}
                </kbd>
              )}
            </For>
          </Show>
        </div>
      </div>

      <div class={styles.Section}>
        <span class={styles.SectionLabel}>Shift</span>
        <span class={styles.Badge} data-state={isShiftPressed() ? 'active' : undefined}>
          <span class={styles.Dot} data-pulse={isShiftPressed() ? '' : undefined} />
          {isShiftPressed() ? 'Precision mode' : 'Hold Shift for precision'}
        </span>
      </div>
    </div>
  )
}
