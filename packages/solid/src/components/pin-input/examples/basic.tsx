import { PinInput } from '@ark-ui/solid/pin-input'
import { Index } from 'solid-js'
import styles from 'styles/pin-input.module.css'

export const Basic = () => (
  <PinInput.Root class={styles.Root}>
    <PinInput.Label class={styles.Label}>Label</PinInput.Label>
    <PinInput.Control class={styles.Control}>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} class={styles.Input} />}</Index>
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)
