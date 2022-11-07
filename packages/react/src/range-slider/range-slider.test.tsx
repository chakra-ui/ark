import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { JSDOM } from 'jsdom'
import { type RangeSliderProps } from './range-slider'

const ComponentUnderTest = (props: RangeSliderProps) => (
  <Slider
    min={-50}
    max={50}
    defaultValue={0}
    getRootNode={() => new JSDOM().window.document}
    {...props}
  >
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
)

describe('Slider', () => {
  it('should render!', async () => {
    render(<ComponentUnderTest />)
  })

  it('should move the thumb correctly when orientated horizontal', async () => {
    render(<ComponentUnderTest />)

    const thumb = screen.getByRole('slider', { hidden: true })

    thumb.focus()

    await user.keyboard('[ArrowRight]')
    expect(thumb).toHaveAttribute('aria-valuenow', '1')

    await user.keyboard('[ArrowRight]')
    expect(thumb).toHaveAttribute('aria-valuenow', '2')

    await user.keyboard('[Home]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-50')

    await user.keyboard('[End]')
    expect(thumb).toHaveAttribute('aria-valuenow', '50')
  })

  it('should move the thumb correctly when orientated vertical', async () => {
    render(<ComponentUnderTest orientation="vertical" />)

    const thumb = screen.getByRole('slider', { hidden: true })
    thumb.focus()

    await user.keyboard('[ArrowUp]')
    expect(thumb).toHaveAttribute('aria-valuenow', '1')

    await user.keyboard('[ArrowDown]')
    expect(thumb).toHaveAttribute('aria-valuenow', '0')

    await user.keyboard('[Home]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-50')

    await user.keyboard('[End]')
    expect(thumb).toHaveAttribute('aria-valuenow', '50')
  })

  it('should move the thumb correctly under rtl ', async () => {
    render(<ComponentUnderTest dir="rtl" />)

    const thumb = screen.getByRole('slider', { hidden: true })
    thumb.focus()

    await user.keyboard('[ArrowRight]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-1')

    await user.keyboard('[ArrowRight]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-2')

    await user.keyboard('[Home]')
    expect(thumb).toHaveAttribute('aria-valuenow', '-50')

    await user.keyboard('[End]')
    expect(thumb).toHaveAttribute('aria-valuenow', '50')
  })
})
