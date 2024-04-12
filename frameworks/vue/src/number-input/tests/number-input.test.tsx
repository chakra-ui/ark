import { numberInputAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { NumberInput } from '../'
import { getExports, getParts } from '../../setup-test'
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

    await waitFor(() => {
      expect(input).toHaveValue('1')
    })
  })

  it('should clamp value on blur when clampValueOnBlur is true', async () => {
    render(ComponentUnderTest, {
      props: { clampValueOnBlur: true, min: 0, max: 10, modelValue: '15' },
    })
    const input = screen.getByRole('spinbutton')
    input.focus()
    await user.tab()

    await waitFor(() => {
      expect(input).toHaveValue('10')
    })
  })

  it('should allow value to exceed max when allowOverflow is true', async () => {
    render(ComponentUnderTest, { props: { allowOverflow: true, max: 10, modelValue: '15' } })
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveValue('15')
  })

  it('should handle custom format and parse functions', async () => {
    render(ComponentUnderTest, { props: { formatOptions: { currency: 'USD' }, modelValue: '5' } })
    const input = screen.getByRole('spinbutton')

    await waitFor(() => {
      expect(input).toHaveValue('5')
    })
  })

  it('should increment value by step when using increment button', async () => {
    render(ComponentUnderTest, { props: { step: 5, modelValue: '0' } })
    const incrementBtn = screen.getByText('+1')
    await user.click(incrementBtn)

    const input = screen.getByRole('spinbutton')
    await waitFor(() => {
      expect(input).toHaveValue('5')
    })
  })

  it.skip('should handle min and max fraction digits', async () => {
    render(ComponentUnderTest, {
      props: {
        modelValue: '1.00',
        formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 3 },
      },
    })
    const input = screen.getByRole('spinbutton')
    await waitFor(() => {
      expect(input).toHaveValue('1.00')
    })
    await user.clear(input)
    await user.type(input, '1.1234')
    await user.tab()

    await waitFor(() => {
      expect(input).toHaveValue('1.123')
    })
  })
})
