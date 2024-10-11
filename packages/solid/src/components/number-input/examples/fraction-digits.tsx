import { NumberInput } from '@ark-ui/solid/number-input'

export const FractionDigits = () => (
  <NumberInput.Root
    formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 4 }}
    value="1.00"
  >
    <NumberInput.Scrubber />
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)
