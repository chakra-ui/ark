import { NumberInput, useNumberInput } from '@ark-ui/solid/number-input'

export const RootProvider = () => {
  const numberInput = useNumberInput()

  return (
    <>
      <button onClick={() => numberInput().focus()}>Focus</button>

      <NumberInput.RootProvider value={numberInput}>
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.RootProvider>
    </>
  )
}
