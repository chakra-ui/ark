import { LocaleProvider } from '@ark-ui/solid/locale'
import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { ComponentUnderTest } from './basic.tsx'

describe('Slider', () => {
  it('should be possible to control it with the arrow keys', async () => {
    render(() => <ComponentUnderTest />)

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
    render(() => <ComponentUnderTest />)

    const [leftThumb] = screen.getAllByRole('slider', { hidden: true })
    leftThumb.focus()
    await user.keyboard('[End]')
    await waitFor(() => expect(leftThumb).toHaveAttribute('aria-valuenow', '20'))

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(leftThumb).toHaveAttribute('aria-valuenow', '20'))
  })

  it('should be possible to control it with the arrow keys in rtl mode', async () => {
    render(() => (
      <LocaleProvider locale="ar-AE">
        <ComponentUnderTest />
      </LocaleProvider>
    ))

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
    render(() => <ComponentUnderTest orientation="vertical" />)

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
    render(() => <ComponentUnderTest disabled />)
    const [leftThumb, rightThumb] = screen.getAllByRole('slider', { hidden: true })
    expect(leftThumb).toHaveAttribute('aria-disabled', 'true')
    expect(rightThumb).toHaveAttribute('aria-disabled', 'true')
  })

  it('should emit correct onValueChange events', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)
    const [leftThumb] = screen.getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowRight]')

    await waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1))
  })

  describe('prop: largeStep', () => {
    it('should step by the default largeStep (10 * step) when Shift is held', async () => {
      render(() => <ComponentUnderTest />)
      const [leftThumb] = screen.getAllByRole('slider', { hidden: true })

      leftThumb.focus()
      await user.keyboard('{Shift>}[ArrowRight]{/Shift}')
      expect(leftThumb).toHaveAttribute('aria-valuenow', '-10')
    })

    it('should step by the default largeStep when PageUp/PageDown is pressed', async () => {
      render(() => <ComponentUnderTest />)
      const [leftThumb] = screen.getAllByRole('slider', { hidden: true })

      leftThumb.focus()
      await user.keyboard('[PageUp]')
      expect(leftThumb).toHaveAttribute('aria-valuenow', '-10')

      await user.keyboard('[PageDown]')
      expect(leftThumb).toHaveAttribute('aria-valuenow', '-20')
    })

    it('should use an explicit largeStep when Shift is held', async () => {
      render(() => <ComponentUnderTest largeStep={5} />)
      const [leftThumb] = screen.getAllByRole('slider', { hidden: true })

      leftThumb.focus()
      await user.keyboard('{Shift>}[ArrowRight]{/Shift}')
      expect(leftThumb).toHaveAttribute('aria-valuenow', '-15')
    })
  })
})
