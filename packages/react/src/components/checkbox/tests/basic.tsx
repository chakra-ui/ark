import { CheckIcon, MinusIcon } from 'lucide-react'
import { Checkbox } from '../'

export const ComponentUnderTest = (props: Checkbox.RootProps) => (
  <Checkbox.Group>
    <Checkbox.Root {...props}>
      <Checkbox.Label>Checkbox</Checkbox.Label>
      <Checkbox.Control data-testid="control">
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  </Checkbox.Group>
)
