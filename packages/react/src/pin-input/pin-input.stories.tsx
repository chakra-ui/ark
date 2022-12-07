import { PinInput, PinInputControls, PinInputField, PinInputLabel } from './'

export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControls>
      {[0, 1, 2].map((id, index) => (
        <PinInputField key={id} index={index} />
      ))}
    </PinInputControls>
  </PinInput>
)
