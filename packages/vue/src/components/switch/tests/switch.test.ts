import { switchAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { Switch } from '..'
import { getExports, getParts } from '../../../setup-test'
import WithField from '../examples/with-field.vue'
import ComponentUnderTest from './switch.test.vue'

describe('Switch', () => {
  it.each(getParts(switchAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(switchAnatomy))('should export %s', async (part) => {
    expect(Switch[part]).toBeDefined()
  })

  it('should toggle state when clicked', async () => {
    const onCheckedChange = vi.fn()

    render(ComponentUnderTest, { props: { onCheckedChange } })

    const switchControl = screen.getByRole('checkbox')
    await user.click(switchControl)

    expect(onCheckedChange).toHaveBeenCalledWith({ checked: true })
  })

  it('should not toggle when disabled', async () => {
    const onCheckedChange = vi.fn()

    render(ComponentUnderTest, { props: { onCheckedChange, disabled: true } })
    expect(screen.getByRole('checkbox')).toBeDisabled()

    const switchControl = screen.getByRole('checkbox')
    await user.click(switchControl)

    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('should show invalid attribute when invalid', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    const switchControl = screen.getByRole('checkbox')

    expect(switchControl).toHaveAttribute('aria-invalid', 'true')
  })

  it('should be required when required is true', async () => {
    render(ComponentUnderTest, { props: { required: true } })
    const switchControl = screen.getByRole('checkbox')

    expect(switchControl).toBeRequired()
  })
})

describe('Switch / Field', () => {
  it('should set switch as required', async () => {
    render(WithField, { props: { required: true } })
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeRequired()
  })

  it('should set switch as disabled', async () => {
    render(WithField, { props: { disabled: true } })
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeDisabled()
  })

  it('should display helper text', async () => {
    render(WithField)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(WithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on switch when label is clicked', async () => {
    render(WithField)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('checkbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(WithField)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
