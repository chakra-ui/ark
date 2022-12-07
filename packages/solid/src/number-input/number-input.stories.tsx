import {
  NumberInput,
  NumberInputControls,
  NumberInputDecrementTrigger,
  NumberInputField,
  NumberInputIncrementTrigger,
  NumberInputLabel,
  NumberInputScrubber,
} from './'
import './number-input.css'

export const Basic = () => (
  <NumberInput min={-50} max={50} value="0" clampValueOnBlur>
    <NumberInputScrubber />
    <NumberInputLabel>Label</NumberInputLabel>
    <NumberInputField />
    <NumberInputControls>
      <NumberInputDecrementTrigger>
        <button>-1</button>
      </NumberInputDecrementTrigger>
      <NumberInputIncrementTrigger>
        <button>+1</button>
      </NumberInputIncrementTrigger>
    </NumberInputControls>
  </NumberInput>
)
