import user from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { NumberInput, numberInputAnatomy } from '../'
import { getExports, getParts } from '../../../setup-test'
import WithField from '../examples/with-field.vue'
import ComponentUnderTest from './number-input.test.vue'

describe('NumberInput', () => {
  it.each(getParts(numberInputAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(numberInputAnatomy))('should export %s', async (part) => {
    expect(NumberInput[part]).toBeDefined()
  })

  it('should handle wheel event when allowMouseWheel is true', async () => {
    render(ComponentUnderTest, { props: { allowMouseWheel: true } })
    const input = screen.getByRole('spinbutton')
    input.focus()
    fireEvent.wheel(input, { deltaY: -1 })

    await waitFor(() => expect(input).toHaveValue('1'))
  })

  it('should clamp value on blur when clampValueOnBlur is true', async () => {
    render(ComponentUnderTest, {
      props: { clampValueOnBlur: true, min: 0, max: 10, modelValue: '15' },
    })
    const input = screen.getByRole('spinbutton')
    input.focus()
    await user.tab()

    await waitFor(() => expect(input).toHaveValue('10'))
  })

  it('should allow value to exceed max when allowOverflow is true', async () => {
    render(ComponentUnderTest, { props: { allowOverflow: true, max: 10, modelValue: '15' } })
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveValue('15')
  })

  it('should handle custom format and parse functions', async () => {
    render(ComponentUnderTest, { props: { formatOptions: { currency: 'USD' }, modelValue: '5' } })
    const input = screen.getByRole('spinbutton')

    await waitFor(() => expect(input).toHaveValue('5'))
  })

  it('should increment value by step when using increment button', async () => {
    render(ComponentUnderTest, { props: { step: 5, modelValue: '0' } })
    const incrementBtn = screen.getByText('+1')
    await user.click(incrementBtn)

    const input = screen.getByRole('spinbutton')
    await waitFor(() => expect(input).toHaveValue('5'))
  })

  it.skip('should handle min and max fraction digits', async () => {
    render(ComponentUnderTest, {
      props: {
        modelValue: '1.00',
        formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 3 },
      },
    })
    const input = screen.getByRole('spinbutton')
    await waitFor(() => expect(input).toHaveValue('1.00'))
    await user.clear(input)
    await user.type(input, '1.1234')
    await user.tab()
    await waitFor(() => expect(input).toHaveValue('1.123'))
  })
})

describe('NumberInput / Field', () => {
  it('should set input as required', async () => {
    render(WithField, { props: { required: true } })
    expect(screen.getByRole('spinbutton', { name: /label/i })).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(WithField, { props: { disabled: true } })
    expect(screen.getByRole('spinbutton', { name: /label/i })).toBeDisabled()
  })

  it('should set input as readonly', async () => {
    render(WithField, { props: { readOnly: true } })
    expect(screen.getByRole('spinbutton', { name: /label/i })).toHaveAttribute('readonly')
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
    expect(screen.getByRole('spinbutton', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(WithField)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
