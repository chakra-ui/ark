import { Checkbox, type CheckboxRootProps } from '../'

export const ComponentUnderTest = (props: CheckboxRootProps) => (
  <Checkbox.Root {...props}>
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control data-testid="control" />
    <Checkbox.Indicator>Indicator</Checkbox.Indicator>
  </Checkbox.Root>
)
