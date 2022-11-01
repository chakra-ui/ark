import {
  NumberInput,
  NumberInputDecrementButton,
  NumberInputField,
  NumberInputIncrementButton,
} from '@atlas/react'

export const ReactNumberInput = () => {
  return (
    <NumberInput max={10} clampValueOnBlur>
      <div>
        <NumberInputField />
        <NumberInputDecrementButton>Dec</NumberInputDecrementButton>
        <NumberInputIncrementButton>Inc</NumberInputIncrementButton>
      </div>
    </NumberInput>
  )
}
