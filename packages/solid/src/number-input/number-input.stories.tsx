import type { Meta } from 'storybook-solidjs'
import { NumberInput } from './'
import './number-input.css'

const meta: Meta = {
  title: 'NumberInput',
}

export default meta

export const Basic = () => (
  <NumberInput.Root min={-50} max={50} value="0" clampValueOnBlur>
    <NumberInput.Scrubber />
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)
