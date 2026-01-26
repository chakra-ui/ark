import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { ComponentUnderTest, NumberInputWithField } from './basic'

describe('NumberInput', () => {
  it('should handle wheel event when allowMouseWheel is true', async () => {
    render(() => <ComponentUnderTest allowMouseWheel />)
    const input = screen.getByRole('spinbutton')

    input.focus()
    await waitFor(() => expect(input).toHaveFocus())

    fireEvent.wheel(input, { deltaY: -1 })
    await waitFor(() => expect(input).toHaveValue('1'))
  })

  it('should clamp value on blur when clampValueOnBlur is true', async () => {
    render(() => <ComponentUnderTest clampValueOnBlur min={0} max={10} defaultValue="15" />)
    const input = screen.getByRole('spinbutton')
    input.focus()
    input.blur()

    await waitFor(() => {
      expect(input).toHaveValue('10')
    })
  })

  it('should allow value to exceed max when allowOverflow is true', async () => {
    render(() => <ComponentUnderTest allowOverflow max={10} defaultValue="15" />)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveValue('15')
  })

  it('should handle custom format and parse functions', async () => {
    render(() => <ComponentUnderTest formatOptions={{ currency: 'USD' }} defaultValue="5" />)
    const input = screen.getByRole('spinbutton')

    await waitFor(() => {
      expect(input).toHaveValue('5')
    })
  })

  it('should increment value by step when using increment button', async () => {
    render(() => <ComponentUnderTest step={5} defaultValue="0" />)
    const incrementBtn = screen.getByText('+1')
    await user.click(incrementBtn)

    const input = screen.getByRole('spinbutton')
    await waitFor(() => {
      expect(input).toHaveValue('5')
    })
  })

  it('should handle min and max fraction digits', async () => {
    render(() => (
      <ComponentUnderTest defaultValue="1.00" formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 3 }} />
    ))
    const input = screen.getByRole('spinbutton')
    await waitFor(() => {
      expect(input).toHaveValue('1.00')
    })
    await user.clear(input)
    await user.type(input, '1.1234')
    input.blur()

    await waitFor(() => {
      expect(input).toHaveValue('1.123')
    })
  })
})

describe('NumberInput / Field', () => {
  it('should set input as required', async () => {
    render(() => <NumberInputWithField required />)
    expect(screen.getByRole('spinbutton', { name: /label/i })).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(() => <NumberInputWithField disabled />)
    expect(screen.getByRole('spinbutton', { name: /label/i })).toBeDisabled()
  })

  it('should set input as readonly', async () => {
    render(() => <NumberInputWithField readOnly />)
    expect(screen.getByRole('spinbutton', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(() => <NumberInputWithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(() => <NumberInputWithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(() => <NumberInputWithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('spinbutton', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(() => <NumberInputWithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
