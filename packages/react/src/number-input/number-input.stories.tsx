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

import type { Meta } from '@storybook/react'

type NumberInputType = typeof NumberInput

const meta: Meta<NumberInputType> = {
  title: 'NumberInput',
  component: NumberInput,
}

export default meta

export const Basic = () => (
  <NumberInput min={-50} max={50} clampValueOnBlur>
    <NumberInputScrubber />
    <NumberInputLabel>Label</NumberInputLabel>
    <NumberInputField />
    <NumberInputControl>
      <NumberInputDecrementTrigger>
        <button>-1</button>
      </NumberInputDecrementTrigger>
      <NumberInputIncrementTrigger>
        <button>+1</button>
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
)
