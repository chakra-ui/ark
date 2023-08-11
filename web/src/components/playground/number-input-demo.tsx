import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { IconButton } from '~/components/ui/icon-button'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputScrubber,
} from '~/components/ui/number-input'

export const NumberInputDemo = () => {
  return (
    <NumberInput min={-50} max={50} defaultValue="42">
      <NumberInputScrubber />
      <NumberInputInput />
      <NumberInputControl>
        <NumberInputIncrementTrigger asChild>
          <IconButton size="xs" variant="tertiary" aria-label="Increment">
            <FiChevronUp />
          </IconButton>
        </NumberInputIncrementTrigger>
        <hr />
        <NumberInputDecrementTrigger asChild>
          <IconButton size="xs" variant="tertiary" aria-label="Decrement">
            <FiChevronDown />
          </IconButton>
        </NumberInputDecrementTrigger>
      </NumberInputControl>
    </NumberInput>
  )
}
