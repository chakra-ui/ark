import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Checkbox } from '../'
import { CheckboxWithField } from './field'
import { ComponentUnderTest } from './basic'
import { ControlledComponentUnderTest } from './controlled'

describe('Checkbox', () => {
  it('should handle check and unchecked', async () => {
    const onChange = vi.fn()
    render(() => <ComponentUnderTest onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should invoke onCheckedChange', async () => {
    const onCheckedChange = vi.fn()
    render(() => <ComponentUnderTest onCheckedChange={onCheckedChange} />)

    fireEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith({ checked: true }))

    fireEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith({ checked: false }))
  })

  it('should handle indeterminate state properly', async () => {
    render(() => <ComponentUnderTest checked="indeterminate" />)
    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'indeterminate')
  })

  it('should allow controlled usage', async () => {
    render(() => <ControlledComponentUnderTest />)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
    await user.click(screen.getByText('set checked'))
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked())
  })
})

describe('Checkbox / Field', () => {
  it('should set checkbox as required', async () => {
    render(() => <CheckboxWithField required />)
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(() => <CheckboxWithField disabled />)
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeDisabled()
  })

  it('should set input as readonly', async () => {
    render(() => <CheckboxWithField readOnly />)
    expect(screen.getByText('Label')).toHaveAttribute('data-readonly')
  })

  it('should display helper text', async () => {
    render(() => <CheckboxWithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(() => <CheckboxWithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(() => <CheckboxWithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('checkbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(() => <CheckboxWithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})

const WithGroup = () => (
  <Checkbox.Group>
    <Checkbox.Root value="one">
      <Checkbox.Label>One</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Checkbox.Root value="two" disabled>
      <Checkbox.Label>Two</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Checkbox.Root value="three">
      <Checkbox.Label>Three</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  </Checkbox.Group>
)

describe('Checkbox / Group', () => {
  it('should allow individual checkbox to be disabled', async () => {
    render(() => <WithGroup />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).not.toBeDisabled()
    expect(checkboxes[1]).toBeDisabled()
    expect(checkboxes[2]).not.toBeDisabled()
  })
})
