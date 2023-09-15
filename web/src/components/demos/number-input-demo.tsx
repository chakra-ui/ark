import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from '~/components/ui/number-input'

export const NumberInputDemo = () => {
  return (
    <NumberInput min={0} max={5} defaultValue="3" width="2xs">
      <NumberInputLabel>Quantity</NumberInputLabel>
      <NumberInputControl>
        <NumberInputInput />
        <NumberInputIncrementTrigger>
          <ChevronUpIcon />
        </NumberInputIncrementTrigger>
        <NumberInputDecrementTrigger>
          <ChevronDownIcon />
        </NumberInputDecrementTrigger>
      </NumberInputControl>
    </NumberInput>
  )
}
