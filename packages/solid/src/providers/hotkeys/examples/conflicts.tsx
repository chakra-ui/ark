import {
  type ConflictBehavior,
  type HotkeyStore,
  createHotkeyStore,
  useHotkeyRegistrations,
  useHotkeys,
} from '@ark-ui/solid/hotkeys'
import { For, Show, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/hotkeys.module.css'

const BEHAVIORS: ConflictBehavior[] = ['warn', 'replace', 'allow']

const Demo = (props: { store: HotkeyStore }) => {
  const [fired, setFired] = createSignal<string[]>([])

  useHotkeys({
    commands: [
      { id: 'first', hotkey: 'mod+K', action: () => setFired((log) => [...log, 'First']), label: 'First' },
      { id: 'second', hotkey: 'mod+K', action: () => setFired((log) => [...log, 'Second']), label: 'Second' },
    ],
    store: props.store,
  })

  const commands = useHotkeyRegistrations({ store: props.store })

  return (
    <>
      <div class={styles.Section}>
        <span class={styles.SectionLabel}>Registered on mod+K</span>
        <div class={styles.KeyStrip}>
          <Show when={commands().length > 0} fallback={<span class={styles.Placeholder}>none</span>}>
            <For each={commands()}>{(command) => <span class={styles.Badge}>{command.label}</span>}</For>
          </Show>
        </div>
      </div>

      <div class={styles.Section}>
        <span class={styles.SectionLabel}>Fired on last press</span>
        <span class={styles.Badge} data-state={fired().length > 0 ? 'active' : undefined}>
          {fired().slice(-2).join(' + ') || 'nothing yet'}
        </span>
      </div>
    </>
  )
}

export const Conflicts = () => {
  const [behavior, setBehavior] = createSignal<ConflictBehavior>('warn')

  return (
    <div class={styles.Panel}>
      <p class={styles.Hint}>Two commands claim the same shortcut. Pick how the store resolves it, then press it.</p>

      <div class={styles.Toolbar}>
        <For each={BEHAVIORS}>
          {(value) => (
            <button type="button" class={button.Root} onClick={() => setBehavior(value)}>
              {value}
            </button>
          )}
        </For>
      </div>

      <Show when={behavior()} keyed>
        {(current) => {
          // Built once per behavior: Solid props are getters, so an inline call would
          // rebuild the store on every read.
          const store = createHotkeyStore({ conflictBehavior: current })
          return <Demo store={store} />
        }}
      </Show>
    </div>
  )
}
