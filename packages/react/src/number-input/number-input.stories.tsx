import type { Meta } from '@storybook/react'
import { NumberInput } from './'
import './number-input.css'

type NumberInputType = typeof NumberInput.Root

const meta: Meta<NumberInputType> = {
  title: 'NumberInput.',
  component: NumberInput.Root,
}

export default meta

export const Basic = () => (
  <NumberInput.Root min={-50} max={50} clampValueOnBlur>
    <NumberInput.Scrubber />
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)
