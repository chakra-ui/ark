import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './range-slider.test.vue'

describe('RangeSlider', () => {
  it('should render!', async () => {
    render(ComponentUnderTest)
  })

  it('should be possible to control it with the arrow keys', async () => {
    render(ComponentUnderTest)

    const [leftThumb, rightThumb] = screen.getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowRight]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '-19')

    await user.keyboard('[ArrowLeft]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '-20')

    rightThumb.focus()
    await user.keyboard('[ArrowRight]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '21')

    await user.keyboard('[ArrowLeft]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '20')
  })

  it('should not be possible to overlap the right thumb with the left thumb', async () => {
    render(ComponentUnderTest)

    const [leftThumb] = screen.getAllByRole('slider', { hidden: true })
    leftThumb.focus()
    await user.keyboard('[End]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '20')

    await user.keyboard('[ArrowRight]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '20')
  })

  it('should be possible to control it with the arrow keys in rtl mode', async () => {
    render(ComponentUnderTest, { props: { dir: 'rtl' } })

    const [leftThumb, rightThumb] = screen.getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowRight]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '-21')

    await user.keyboard('[ArrowLeft]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '-20')

    rightThumb.focus()
    await user.keyboard('[ArrowRight]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '19')

    await user.keyboard('[ArrowLeft]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '20')
  })

  it('should be possible to control it with the arrow keys in vertical mode', async () => {
    render(ComponentUnderTest, { props: { orientation: 'vertical' } })
    const [leftThumb, rightThumb] = screen.getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowUp]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '-19')

    await user.keyboard('[ArrowDown]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '-20')

    rightThumb.focus()
    await user.keyboard('[ArrowUp]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '21')

    await user.keyboard('[ArrowDown]')
    expect(rightThumb).toHaveAttribute('aria-valuenow', '20')
  })

  it('should handle disabled state', async () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    const [leftThumb, rightThumb] = screen.getAllByRole('slider', { hidden: true })
    expect(leftThumb).toHaveAttribute('aria-disabled', 'true')
    expect(rightThumb).toHaveAttribute('aria-disabled', 'true')
  })

  it('should emit correct onValueChange events', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange: onValueChange } })
    const [leftThumb] = screen.getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1))
  })
})
