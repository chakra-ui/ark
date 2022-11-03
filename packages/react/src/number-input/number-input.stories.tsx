import { NumberInput } from './number-input'
import { NumberInputDecrementButton } from './number-input-decrement-button'
import { NumberInputField } from './number-input-field'
import { NumberInputIncrementButton } from './number-input-increment-button'

export const Basic = () => {
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
