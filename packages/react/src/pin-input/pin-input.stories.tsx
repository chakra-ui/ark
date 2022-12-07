import { PinInput } from './pin-input'
import { PinInputField } from './pin-input-field'

// TODO implement hidden input but dont exprot this
// TODO implement PinInputLabel
export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    {[0, 1, 2].map((id, index) => (
      <PinInputField key={id} index={index} />
    ))}
  </PinInput>
)

// export const Basic = () => (
//   <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
//     <PinIntputLabel>asd</PinIntputLabel>
//     <PinInputControls>
//       {[0, 1, 2].map((id, index) => (
//         <PinInputField key={id} index={index} />
//       ))}
//     </PinInputControls>
//   </PinInput>
// )
