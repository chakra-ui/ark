import { NumberInput } from './number-input'
import { NumberInputDecrementButton } from './number-input-decrement-button'
import { NumberInputField } from './number-input-field'
import { NumberInputIncrementButton } from './number-input-increment-button'

// TODO implement label, controls, scrubber, increment trigger, descremtntiger
export const Basic = () => {
  return (
    <NumberInput max={10} clampValueOnBlur>
      <div>
        <NumberInputField />
        <NumberInputDecrementButton>
          <button>Dec</button>
        </NumberInputDecrementButton>
        <NumberInputIncrementButton>Inc</NumberInputIncrementButton>
      </div>
    </NumberInput>
  )
}
