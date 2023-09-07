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
  <NumberInput.Root>
    <NumberInput.Scrubber />
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)

export const MouseWheel = () => (
  <NumberInput.Root allowMouseWheel>
    <NumberInput.Scrubber />
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)

export const FractionDigits = () => (
  <NumberInput.Root minFractionDigits={2} maxFractionDigits={4} defaultValue="1.00">
    <NumberInput.Scrubber />
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)
