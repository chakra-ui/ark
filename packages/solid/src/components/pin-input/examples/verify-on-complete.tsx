import { PinInput } from '@ark-ui/solid/pin-input'
import { Index, createSignal } from 'solid-js'
import styles from 'styles/pin-input.module.css'

const expected = '1234'

export const VerifyOnComplete = () => {
  const [invalid, setInvalid] = createSignal(false)
  const [verified, setVerified] = createSignal(false)

  return (
    <div class="stack">
      <PinInput.Root
        class={styles.Root}
        count={4}
        otp
        invalid={invalid()}
        onValueChange={() => {
          setInvalid(false)
          setVerified(false)
        }}
        onValueComplete={(details) => {
          const matches = details.valueAsString === expected
          setInvalid(!matches)
          setVerified(matches)
        }}
      >
        <PinInput.Label class={styles.Label}>Enter {expected} to verify</PinInput.Label>
        <PinInput.Control class={styles.Control}>
          <Index each={[0, 1, 2, 3]}>{(id) => <PinInput.Input index={id()} class={styles.Input} />}</Index>
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.Root>
      {invalid() && <p>Invalid code</p>}
      {verified() && <p>Code verified</p>}
    </div>
  )
}
