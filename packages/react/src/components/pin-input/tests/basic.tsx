import { Field } from '@ark-ui/react/field'
import { PinInput } from '../index.ts'

export const ComponentUnderTest = (props: Partial<PinInput.RootProps>) => (
  <PinInput.Root count={3} {...props}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      {[0, 1, 2].map((id, index) => (
        <PinInput.Input key={id} index={index} />
      ))}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)

export const PinInputWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <PinInput.Root count={3}>
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
