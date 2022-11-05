import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Checkbox, CheckboxProps } from './checkbox'
import { CheckboxControl } from './checkbox-control'
import { CheckboxInput } from './checkbox-input'
import { CheckboxLabel } from './checkbox-label'

const Component = (props: CheckboxProps) => (
  <Checkbox defaultChecked {...props}>
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

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should handle indeterminate state properly', async () => {
    render(<Component indeterminate />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed')
  })
})
