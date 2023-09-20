import { numberInputAnatomy } from '@ark-ui/anatomy'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { getParts } from '../setup-test'
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputScrubber,
  type NumberInputProps,
} from './'

const ComponentUnderTest = (props: NumberInputProps) => (
  <NumberInput {...props}>
    <NumberInputLabel>Label</NumberInputLabel>
    <NumberInputInput />
    <NumberInputScrubber />
    <NumberInputControl>
      <NumberInputDecrementTrigger>-1</NumberInputDecrementTrigger>
      <NumberInputIncrementTrigger>+1</NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
)

describe('NumberInput', () => {
  it.each(getParts(numberInputAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should handle wheel event when allowMouseWheel is true', async () => {
    render(<ComponentUnderTest allowMouseWheel />)
    const input = screen.getByRole('spinbutton')
    act(() => {
      input.focus()
    })
    fireEvent.wheel(input, { deltaY: -1 })

    await waitFor(() => {
      expect(input).toHaveValue('1')
    })
  })

  it('should clamp value on blur when clampValueOnBlur is true', async () => {
    render(<ComponentUnderTest clampValueOnBlur min={0} max={10} defaultValue="15" />)
    const input = screen.getByRole('spinbutton')
    act(() => {
      input.focus()
    })
    fireEvent.blur(input)

    await waitFor(() => {
      expect(input).toHaveValue('10')
    })
  })

  it('should  allow value to exceed max when allowOverflow is true', async () => {
    render(<ComponentUnderTest allowOverflow max={10} defaultValue="15" />)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveValue('15')
  })

  it('should handle custom format and parse functions', async () => {
    const format = (value: string) => `USD ${value}`
    const parse = (value: string) => value.replace('USD ', '')

    render(<ComponentUnderTest format={format} parse={parse} defaultValue="5" />)
    const input = screen.getByRole('spinbutton')

    await waitFor(() => {
      expect(input).toHaveValue('USD 5')
    })
  })

  it('should increment value by step when using increment button', async () => {
    render(<ComponentUnderTest step={5} defaultValue="0" />)
    const incrementBtn = screen.getByText('+1')
    await user.click(incrementBtn)

    const input = screen.getByRole('spinbutton')
    await waitFor(() => {
      expect(input).toHaveValue('5')
    })
  })

  it('should handle min and max fraction digits', async () => {
    render(<ComponentUnderTest minFractionDigits={2} maxFractionDigits={3} defaultValue="1.00" />)
    const input = screen.getByRole('spinbutton')
    await waitFor(() => {
      expect(input).toHaveValue('1.00')
    })
    await user.clear(input)
    await user.type(input, '1.1234')
    fireEvent.blur(input)

    await waitFor(() => {
      expect(input).toHaveValue('1.123')
    })
  })
})
