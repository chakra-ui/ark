import { PinInput, PinInputField } from '@atlas/react'
import { useState } from 'react'

export const ReactPinInput = () => {
  const [disabled, setDisabled] = useState(true)
  return (
    <>
      <button onClick={() => setDisabled((value) => !value)}>Activate me</button>
      <PinInput disabled={disabled} placeholder="*" value={['1', '2', '3']}>
        {[0, 1, 2].map((id, index) => (
          <PinInputField key={id} index={index} />
        ))}
      </PinInput>
    </>
  )
}
