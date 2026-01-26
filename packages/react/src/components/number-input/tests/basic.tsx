import { Field } from '@ark-ui/react/field'
import { NumberInput } from '../'

export const ComponentUnderTest = (props: NumberInput.RootProps) => (
  <NumberInput.Root {...props}>
    <NumberInput.Label>
      Label: <NumberInput.ValueText />
    </NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Scrubber />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)

export const NumberInputWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <NumberInput.Root>
      <NumberInput.Label>Label</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
        <NumberInput.Input />
        <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
