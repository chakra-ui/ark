import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'

export const RenderProp = () => (
  <Checkbox.Root>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Context>
      {(checkbox) => <Checkbox.Label>Checkbox {checkbox().checked.toString()}</Checkbox.Label>}
    </Checkbox.Context>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
