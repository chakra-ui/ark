import { Field } from '@ark-ui/react/field'
import { PinInput } from '@ark-ui/react/pin-input'

export const WithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <PinInput.Root>
      <PinInput.Label>Label</PinInput.Label>
      <PinInput.Control>
        {[0, 1, 2].map((id, index) => (
          <PinInput.Input key={id} index={index} />
        ))}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
