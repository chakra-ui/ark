import { PinInput, PinInputField } from '@atlas/react'

export const ReactPinInput = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    {[0, 1, 2].map((id, index) => (
      <PinInputField key={id} index={index} />
    ))}
  </PinInput>
)
