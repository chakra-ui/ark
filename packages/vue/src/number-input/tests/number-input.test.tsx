import user from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './number-input.test.vue'

describe('NumberInput', () => {
  it('should render', async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Label')).toBeInTheDocument()
    expect(screen.getByText('-1')).toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument()
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
      props: { clampValueOnBlur: true, min: 0, max: 10 },
    })
    const input = screen.getByRole('spinbutton')
    await user.type(input, '15')
    await user.tab()

    await waitFor(() => {
      expect(input).toHaveValue('10')
    })
  })

  it('should handle min and max fraction digits', async () => {
    render(ComponentUnderTest, {
      props: { minFractionDigits: 2, maxFractionDigits: 3 },
    })
    const input = screen.getByRole('spinbutton')
    await user.type(input, '1.1234')
    await user.tab()

    await waitFor(() => {
      expect(input).toHaveValue('1.123')
    })
  })
})
