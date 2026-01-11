import { PinInput, usePinInput } from '@ark-ui/solid/pin-input'
import { Index } from 'solid-js'
import styles from 'styles/pin-input.module.css'

export const RootProvider = () => {
  const pinInput = usePinInput({ onValueComplete: (e) => alert(e.valueAsString) })

  return (
    <div class="stack">
      <button onClick={() => pinInput().focus()}>Focus</button>

      <PinInput.RootProvider value={pinInput} class={styles.Root}>
        <PinInput.Label class={styles.Label}>Label</PinInput.Label>
        <PinInput.Control class={styles.Control}>
          <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} class={styles.Input} />}</Index>
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.RootProvider>
    </div>
  )
}
