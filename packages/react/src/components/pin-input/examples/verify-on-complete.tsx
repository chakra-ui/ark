import { PinInput } from '@ark-ui/react/pin-input'
import { useState } from 'react'
import styles from 'styles/pin-input.module.css'

const expected = '1234'

export const VerifyOnComplete = () => {
  const [invalid, setInvalid] = useState(false)
  const [verified, setVerified] = useState(false)

  return (
    <div className="stack">
      <PinInput.Root
        className={styles.Root}
        count={4}
        otp
        invalid={invalid}
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
        <PinInput.Label className={styles.Label}>Enter {expected} to verify</PinInput.Label>
        <PinInput.Control className={styles.Control}>
          {[0, 1, 2, 3].map((id, index) => (
            <PinInput.Input key={id} index={index} className={styles.Input} />
          ))}
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.Root>
      {invalid && <p>Invalid code</p>}
      {verified && <p>Code verified</p>}
    </div>
  )
}
