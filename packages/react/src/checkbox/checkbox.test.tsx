import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Checkbox, CheckboxProps } from './checkbox'
import { CheckboxControl } from './checkbox-control'
import { CheckboxInput } from './checkbox-input'
import { CheckboxLabel } from './checkbox-label'

const Component = (props: CheckboxProps) => (
  <Checkbox {...props}>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl data-testid="foo" />
  </Checkbox>
)

describe('Checkbox', () => {
  it('should render', async () => {
    render(<Component />)
  })

  it('should handle check and unchecked', async () => {
    const onChange = vi.fn()
    render(<Component onChange={onChange} />)

    // TODO fix tests
    // screen.debug()

    // await user.click(screen.getByRole('checkbox'))
    // screen.debug()

    // expect(onChange).toHaveBeenCalledWith({ checked: true })
    // expect(onChange).toHaveBeenCalledWith({ checked: true })
  })

  it('should handle indeterminate state properly', async () => {
    render(<Component indeterminate />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed')
  })
})
