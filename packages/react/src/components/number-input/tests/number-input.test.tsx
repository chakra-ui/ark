import { numberInputAnatomy } from '@ark-ui/anatomy'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { NumberInput } from '../'
import { getExports, getParts } from '../../../setup-test'
import { WithField } from '../examples/with-field'
import { ComponentUnderTest } from './basic'

describe('NumberInput / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(numberInputAnatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(numberInputAnatomy))('should export %s', async (part) => {
    expect(NumberInput[part]).toBeDefined()
  })
})

describe('NumberInput', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
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

  it('should allow value to exceed max when allowOverflow is true', async () => {
    render(<ComponentUnderTest allowOverflow max={10} defaultValue="15" />)

    const input = screen.getByRole('spinbutton')

    expect(input).toHaveValue('15')
  })

  it('should handle custom format and parse functions', async () => {
    render(
      <ComponentUnderTest
        formatOptions={{
          currency: 'USD',
        }}
        defaultValue="5"
      />,
    )

    const input = screen.getByRole('spinbutton')

    await waitFor(() => {
      expect(input).toHaveValue('5')
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
    render(
      <ComponentUnderTest
        defaultValue="1.00"
        formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 3 }}
      />,
    )

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

describe('NumberInput / Field', () => {
  afterEach(() => {
    cleanup()
  })

  it('should set input as required', async () => {
    render(<WithField required />)
    expect(screen.getByRole('spinbutton', { name: /label/i })).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(<WithField disabled />)
    expect(screen.getByRole('spinbutton', { name: /label/i })).toBeDisabled()
  })

  it('should set input as readonly', async () => {
    render(<WithField readOnly />)
    expect(screen.getByRole('spinbutton', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(<WithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<WithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(<WithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('spinbutton', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<WithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
