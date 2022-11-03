import { PinInput } from './pin-input'
import { PinInputField } from './pin-input-field'

export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    {[0, 1, 2].map((id) => (
      <PinInputField index={id} />
    ))}
  </PinInput>
)
