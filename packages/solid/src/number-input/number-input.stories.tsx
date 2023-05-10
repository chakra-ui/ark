import type { Meta } from 'storybook-solidjs'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputField,
  NumberInputIncrementTrigger,
  NumberInputLabel,
  NumberInputScrubber,
} from './'
import './number-input.css'

const meta: Meta = {
  title: 'NumberInput',
}

export default meta

export const Basic = () => (
  <NumberInput min={-50} max={50} value="0" clampValueOnBlur>
    <NumberInputScrubber />
    <NumberInputLabel>Label</NumberInputLabel>
    <NumberInputField />
    <NumberInputControl>
      <NumberInputDecrementTrigger asChild>
        <button>-1</button>
      </NumberInputDecrementTrigger>
      <NumberInputIncrementTrigger asChild>
        <button>+1</button>
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
)
