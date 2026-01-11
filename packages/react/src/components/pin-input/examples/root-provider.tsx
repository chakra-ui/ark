import { PinInput, usePinInput } from '@ark-ui/react/pin-input'
import styles from 'styles/pin-input.module.css'

export const RootProvider = () => {
  const pinInput = usePinInput({ onValueComplete: (e) => alert(e.valueAsString) })

  return (
    <div className="stack">
      <button onClick={() => pinInput.focus()}>Focus</button>

      <PinInput.RootProvider value={pinInput} className={styles.Root}>
        <PinInput.Label className={styles.Label}>Label</PinInput.Label>
        <PinInput.Control className={styles.Control}>
          {[0, 1, 2].map((id, index) => (
            <PinInput.Input key={id} index={index} className={styles.Input} />
          ))}
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.RootProvider>
    </div>
  )
}
