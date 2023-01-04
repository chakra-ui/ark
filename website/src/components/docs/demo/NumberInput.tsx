import { numberInput } from '@/panda/recipes'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputField,
  NumberInputIncrementTrigger,
  NumberInputScrubber,
} from '@ark-ui/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export const DemoNumberInput = () => {
  return (
    <NumberInput min={-50} max={50} defaultValue="42" className={numberInput()}>
      <NumberInputScrubber />
      <NumberInputField />
      <NumberInputControl>
        <NumberInputIncrementTrigger>
          <button>
            <FiChevronUp />
          </button>
        </NumberInputIncrementTrigger>
        <NumberInputDecrementTrigger>
          <button>
            <FiChevronDown />
          </button>
        </NumberInputDecrementTrigger>
      </NumberInputControl>
    </NumberInput>
  )
}
