/** @jsxImportSource solid-js */
import { PinInput, PinInputField } from '@atlas/solid-js'

export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    {[0, 1, 2].map((id, index) => (
      <PinInputField index={index} />
    ))}
  </PinInput>
)
