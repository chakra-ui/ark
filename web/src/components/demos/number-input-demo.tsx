import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputScrubber,
} from '~/components/ui/number-input'
import { Button } from '../ui/button'

export const NumberInputDemo = () => {
  return (
    <NumberInput min={-50} max={50} defaultValue="42">
      <NumberInputScrubber />
      <NumberInputInput />
      <NumberInputControl>
        <NumberInputIncrementTrigger asChild>
          <Button size="xs" variant="tertiary" aria-label="Increment">
            <ChevronUp />
          </Button>
        </NumberInputIncrementTrigger>
        <hr />
        <NumberInputDecrementTrigger asChild>
          <Button px="0" size="xs" variant="tertiary" aria-label="Decrement">
            <ChevronDown />
          </Button>
        </NumberInputDecrementTrigger>
      </NumberInputControl>
    </NumberInput>
  )
}
