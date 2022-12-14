import { PinInput, PinInputControl, PinInputField, PinInputLabel } from './'

export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      {[0, 1, 2].map((id) => (
        <PinInputField index={id} />
      ))}
    </PinInputControl>
  </PinInput>
)
