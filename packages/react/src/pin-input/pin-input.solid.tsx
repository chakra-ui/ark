/** @jsxImportSource solid-js */
import { PinInput, PinInputField } from '@atlas/solid-js'
import { createSignal } from 'solid-js'

export const Basic = () => {
  const [disabled, setDisabled] = createSignal(true)
  return (
    <>
      <button onClick={() => setDisabled(false)}>activate</button>
      <PinInput
        placeholder="*"
        onComplete={(e) => alert(e.valueAsString)}
        disabled={disabled()}
        otp
      >
        {[0, 1, 2].map((id, index) => (
          <PinInputField index={index} />
        ))}
      </PinInput>
    </>
  )
}
