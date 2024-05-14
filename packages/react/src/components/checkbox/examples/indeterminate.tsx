import { CheckIcon, MinusIcon } from 'lucide-react'
import { Checkbox } from '../..'

export const Indeterminate = () => (
  <Checkbox.Root checked="indeterminate">
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
