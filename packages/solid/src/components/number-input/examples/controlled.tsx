import { NumberInput } from '@ark-ui/solid/number-input'
import { createSignal } from 'solid-js'

export const Controlled = () => {
  const [value, setValue] = createSignal('')

  return (
    <>
      <p>Value: {value()}</p>
      <NumberInput.Root value={value()} onValueChange={(e) => setValue(e.value)}>
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </>
  )
}
