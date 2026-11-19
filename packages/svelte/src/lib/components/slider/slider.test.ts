import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import BindableComponentUnderTest from './tests/slider-bindable.test.svelte'
import ComponentUnderTest from './tests/slider.test.svelte'

const getThumbs = () => screen.getAllByRole('slider', { hidden: true })

describe('Slider', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should render a thumb per value with its bounds', () => {
    render(ComponentUnderTest)
    const [left, right] = getThumbs()

    expect(left).toHaveAttribute('aria-valuenow', '-20')
    expect(right).toHaveAttribute('aria-valuenow', '20')
    expect(left).toHaveAttribute('aria-valuemin', '-50')
    expect(right).toHaveAttribute('aria-valuemax', '50')
  })

  it('should move a thumb with the arrow keys and invoke onValueChange', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })
    const [left, right] = getThumbs()

    left.focus()
    await user.keyboard('[ArrowRight]')
    expect(left).toHaveAttribute('aria-valuenow', '-19')
    expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: [-19, 20] }))

    right.focus()
    await user.keyboard('[ArrowLeft]')
    expect(right).toHaveAttribute('aria-valuenow', '19')
  })

  it('should not let the left thumb pass the right thumb', async () => {
    render(ComponentUnderTest)
    const [left] = getThumbs()

    left.focus()
    await user.keyboard('[End]')
    await waitFor(() => expect(left).toHaveAttribute('aria-valuenow', '20'))

    await user.keyboard('[ArrowRight]')
    expect(left).toHaveAttribute('aria-valuenow', '20')
  })

  it('should flip the arrow keys in a right-to-left locale', async () => {
    render(ComponentUnderTest, { props: { locale: 'ar-AE' } })
    const [left] = getThumbs()

    left.focus()
    await user.keyboard('[ArrowRight]')
    expect(left).toHaveAttribute('aria-valuenow', '-21')
  })

  it('should use the arrow keys in vertical orientation', async () => {
    render(ComponentUnderTest, { props: { orientation: 'vertical' } })
    const [left] = getThumbs()

    left.focus()
    await user.keyboard('[ArrowUp]')
    expect(left).toHaveAttribute('aria-valuenow', '-19')
  })

  it('should step by largeStep with Shift held', async () => {
    render(ComponentUnderTest)
    const [left] = getThumbs()

    left.focus()
    await user.keyboard('{Shift>}[ArrowLeft]{/Shift}')
    expect(left).toHaveAttribute('aria-valuenow', '-30')
  })

  it('should disable every thumb when disabled', () => {
    render(ComponentUnderTest, { props: { disabled: true } })

    for (const thumb of getThumbs()) expect(thumb).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set the merged data attributes', () => {
    render(ComponentUnderTest)

    expect(screen.getByTestId('control')).toHaveAttribute('data-slider-control')
    expect(getThumbs()[0]).toHaveAttribute('data-slider-thumb')
    expect(screen.getByText('Quantity')).toHaveAttribute('data-slider-label')
  })

  it('should follow and write back bind:value', async () => {
    render(BindableComponentUnderTest)
    const [thumb] = getThumbs()

    expect(thumb).toHaveAttribute('aria-valuenow', '40')

    await user.click(screen.getByText('set 60'))
    await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '60'))

    thumb.focus()
    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('61'))
  })
})
