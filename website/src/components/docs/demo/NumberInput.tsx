import { numberInput } from '@/panda/recipes'
import { NumberInput } from '@ark-ui/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export const DemoNumberInput = () => {
  return (
    <NumberInput.Root min={-50} max={50} defaultValue="42" className={numberInput()}>
      <NumberInput.Scrubber />
      <NumberInput.Input />
      <NumberInput.Control>
        <NumberInput.IncrementTrigger>
          <FiChevronUp />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger>
          <FiChevronDown />
        </NumberInput.DecrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
  )
}
