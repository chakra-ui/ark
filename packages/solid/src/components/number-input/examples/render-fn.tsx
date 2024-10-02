import { NumberInput } from '@ark-ui/solid/number-input'

export const RenderFn = () => (
  <NumberInput.Root>
    <NumberInput.Scrubber />
    <NumberInput.Context>
      {(context) => <NumberInput.Label>Label {context().valueAsNumber}</NumberInput.Label>}
    </NumberInput.Context>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)
