import { PinInput } from '@ark-ui/react/pin-input'
import styles from 'styles/pin-input.module.css'

export const BlurOnComplete = () => (
  <PinInput.Root className={styles.Root} blurOnComplete>
    <PinInput.Label className={styles.Label}>Label</PinInput.Label>
    <PinInput.Control className={styles.Control}>
      {[0, 1, 2].map((id, index) => (
        <PinInput.Input key={id} index={index} className={styles.Input} />
      ))}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)
