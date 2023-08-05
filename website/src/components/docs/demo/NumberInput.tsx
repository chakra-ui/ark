import { numberInput } from '@/panda/recipes'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputScrubber,
} from '@ark-ui/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export const DemoNumberInput = () => {
  return (
    <NumberInput min={-50} max={50} defaultValue="42" className={numberInput()}>
      <NumberInputScrubber />
      <NumberInputInput />
      <NumberInputControl>
        <NumberInputIncrementTrigger>
          <FiChevronUp />
        </NumberInputIncrementTrigger>
        <NumberInputDecrementTrigger>
          <FiChevronDown />
        </NumberInputDecrementTrigger>
      </NumberInputControl>
    </NumberInput>
  )
}
