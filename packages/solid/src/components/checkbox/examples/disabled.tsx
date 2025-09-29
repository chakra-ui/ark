import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'

export const Disabled = () => (
  <Checkbox.Root disabled>
    <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
