import { NumberInput, type NumberInputProps } from '../'

export const ComponentUnderTest = (props: NumberInputProps) => (
  <NumberInput.Root {...props}>
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Scrubber />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)
