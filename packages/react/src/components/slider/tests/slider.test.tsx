import { act, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { LocaleProvider } from '../../../providers'
import { ComponentUnderTest } from './basic'

describe('Slider', () => {
  it.skip('should have no a11y violations', async () => {
    const { container } = await act(() => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should be possible to control it with the arrow keys', async () => {
    render(<ComponentUnderTest />)

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
    render(<ComponentUnderTest />)

    const [leftThumb] = screen.getAllByRole('slider', { hidden: true })
    leftThumb.focus()
    await user.keyboard('[End]')
    await waitFor(() => expect(leftThumb).toHaveAttribute('aria-valuenow', '20'))

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(leftThumb).toHaveAttribute('aria-valuenow', '20'))
  })

  it('should be possible to control it with the arrow keys in rtl mode', async () => {
    render(
      <LocaleProvider locale="ar-AE">
        <ComponentUnderTest />
      </LocaleProvider>,
    )

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
    render(<ComponentUnderTest orientation="vertical" />)

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
    render(<ComponentUnderTest disabled />)

    const [leftThumb, rightThumb] = await screen.findAllByRole('slider', { hidden: true })

    expect(leftThumb).toHaveAttribute('aria-disabled', 'true')
    expect(rightThumb).toHaveAttribute('aria-disabled', 'true')
  })

  it('should emit correct onValueChange events', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)

    const [leftThumb] = screen.getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowRight]')

    await waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1))
  })
})
