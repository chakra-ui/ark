import { sliderAnatomy } from '@ark-ui/anatomy'
import { cleanup, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Slider } from '../'
import { LocaleProvider } from '../../../providers'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Slider / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(sliderAnatomy))('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(sliderAnatomy))('should export %s', async (part) => {
    expect(Slider[part]).toBeDefined()
  })
})

describe('Slider', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
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
    expect(leftThumb).toHaveAttribute('aria-valuenow', '20')

    await user.keyboard('[ArrowRight]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '20')
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

    const [leftThumb, rightThumb] = screen.getAllByRole('slider', { hidden: true })

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
