import { CheckIcon, MinusIcon } from 'lucide-solid'
import { Checkbox, type CheckboxRootProps } from '../'

export const ComponentUnderTest = (props: CheckboxRootProps) => (
  <Checkbox.Group>
    <Checkbox.Root {...props}>
      <Checkbox.Label>Checkbox</Checkbox.Label>
      <Checkbox.Control data-testid="control">
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  </Checkbox.Group>
)
