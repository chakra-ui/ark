import { numberInputAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { NumberInput } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('NumberInput', () => {
  it.each(getParts(numberInputAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(numberInputAnatomy))('should export %s', async (part) => {
    expect(NumberInput[part]).toBeDefined()
  })

  it('should handle wheel event when allowMouseWheel is true', async () => {
    render(() => <ComponentUnderTest allowMouseWheel />)
    const input = screen.getByRole('spinbutton')
    input.focus()
    fireEvent.wheel(input, { deltaY: -1 })

    await waitFor(() => {
      expect(input).toHaveValue('1')
    })
  })

  it('should clamp value on blur when clampValueOnBlur is true', async () => {
    render(() => <ComponentUnderTest clampValueOnBlur min={0} max={10} value="15" />)
    const input = screen.getByRole('spinbutton')
    input.focus()
    input.blur()

    await waitFor(() => {
      expect(input).toHaveValue('10')
    })
  })

  it('should allow value to exceed max when allowOverflow is true', async () => {
    render(() => <ComponentUnderTest allowOverflow max={10} value="15" />)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveValue('15')
  })

  it('should handle custom format and parse functions', async () => {
    render(() => (
      <ComponentUnderTest
        formatOptions={{
          currency: 'USD',
        }}
        value="5"
      />
    ))
    const input = screen.getByRole('spinbutton')

    await waitFor(() => {
      expect(input).toHaveValue('5')
    })
  })

  it('should increment value by step when using increment button', async () => {
    render(() => <ComponentUnderTest step={5} value="0" />)
    const incrementBtn = screen.getByText('+1')
    await user.click(incrementBtn)

    const input = screen.getByRole('spinbutton')
    await waitFor(() => {
      expect(input).toHaveValue('5')
    })
  })

  it.skip('should handle min and max fraction digits', async () => {
    render(() => (
      <ComponentUnderTest
        value="1.00"
        formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 3 }}
      />
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
