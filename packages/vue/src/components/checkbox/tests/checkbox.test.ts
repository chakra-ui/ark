import { checkboxAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { Checkbox } from '../'
import { getExports, getParts } from '../../../setup-test'
import WithField from '../examples/with-field.vue'
import ComponentUnderTest from './checkbox.test.vue'
import ControlledComponentUnderTest from './controlled-checkbox.test.vue'

describe('Checkbox', () => {
  it.each(getParts(checkboxAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(checkboxAnatomy))('should export %s', async (part) => {
    expect(Checkbox[part]).toBeDefined()
  })

  it('should handle check and unchecked', async () => {
    const onCheckedChange = vi.fn()
    render(ComponentUnderTest, { props: { onCheckedChange } })

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should allow controlled usage', async () => {
    render(ControlledComponentUnderTest)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
    await user.click(screen.getByText('set checked'))
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should handle indeterminate state from example', async () => {
    render(ComponentUnderTest, { props: { checked: 'indeterminate' } })
    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'indeterminate')
  })
})

describe('Checkbox / Field', () => {
  it('should set checkbox as required', async () => {
    render(WithField, { props: { required: true } })
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(WithField, { props: { disabled: true } })
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeDisabled()
  })

  it('should set input as readonly', async () => {
    render(WithField, { props: { readOnly: true } })
    expect(screen.getByText('Label')).toHaveAttribute('data-readonly')
  })

  it('should display helper text', async () => {
    render(WithField)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(WithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(WithField)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('checkbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(WithField)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
