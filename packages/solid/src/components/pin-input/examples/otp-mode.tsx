import { PinInput } from '@ark-ui/solid/pin-input'
import { For } from 'solid-js'
import styles from 'styles/pin-input.module.css'

export const OTPMode = () => (
  <PinInput.Root class={styles.Root} count={3} otp>
    <PinInput.Label class={styles.Label}>Label</PinInput.Label>
    <PinInput.Control class={styles.Control}>
      <For each={[0, 1, 2]} keyed={false}>
        {(id) => <PinInput.Input index={id()} class={styles.Input} />}
      </For>
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)
