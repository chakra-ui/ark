import type { Meta } from '@storybook/react'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputScrubber,
} from './'
import './number-input.css'

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
    <NumberInputInput />
    <NumberInputControl>
      <NumberInputDecrementTrigger>-1</NumberInputDecrementTrigger>
      <NumberInputIncrementTrigger>+1</NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
)
