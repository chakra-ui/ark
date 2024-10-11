import { Field } from '@ark-ui/react/field'
import { NumberInput } from '@ark-ui/react/number-input'

export const WithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <NumberInput.Root>
      <NumberInput.Label>Label</NumberInput.Label>
      <NumberInput.Input />
      <NumberInput.Control>
        <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
        <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
