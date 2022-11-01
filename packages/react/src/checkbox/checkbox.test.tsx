import { render } from '@testing-library/react'
import { Checkbox, CheckboxProps } from './checkbox'
import { CheckboxControl } from './checkbox-control'
import { CheckboxInput } from './checkbox-input'
import { CheckboxLabel } from './checkbox-label'

const Component = (props: CheckboxProps) => (
  <Checkbox {...props}>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
)

describe('Checkbox', () => {
  it('should render', async () => {
    render(<Component />)
  })
})
