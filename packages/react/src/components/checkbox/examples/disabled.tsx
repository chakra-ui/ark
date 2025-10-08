import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'

export const Disabled = () => (
  <Checkbox.Root disabled>
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
