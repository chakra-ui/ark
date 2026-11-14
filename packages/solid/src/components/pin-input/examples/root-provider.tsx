import { PinInput, usePinInput } from '@ark-ui/solid/pin-input'
import { For } from 'solid-js'
import styles from 'styles/pin-input.module.css'

export const RootProvider = () => {
  const pinInput = usePinInput({ count: 3, onValueComplete: (e) => alert(e.valueAsString) })

  return (
    <div class="stack">
      <button onClick={() => pinInput().focus()}>Focus</button>

      <PinInput.RootProvider value={pinInput} class={styles.Root}>
        <PinInput.Label class={styles.Label}>Label</PinInput.Label>
        <PinInput.Control class={styles.Control}>
          <For each={[0, 1, 2]} keyed={false}>
            {(id) => <PinInput.Input index={id()} class={styles.Input} />}
          </For>
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.RootProvider>
    </div>
  )
}
