import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { RangeSlider, type RangeSliderProps } from './range-slider'
import { RangeSliderControl } from './range-slider-control'
import { RangeSliderInput } from './range-slider-input'
import { RangeSliderLabel } from './range-slider-label'
import { RangeSliderOutput } from './range-slider-output'
import { RangeSliderRange } from './range-slider-range'
import { RangeSliderThumb } from './range-slider-thumb'
import { RangeSliderTrack } from './range-slider-track'

const ComponentUnderTest = (props: RangeSliderProps) => {
  const values = [-20, 20]
  return (
    <RangeSlider min={-50} max={50} defaultValue={values} {...props}>
      <div>
        <RangeSliderLabel>Quantity: </RangeSliderLabel>
        <RangeSliderOutput>{({ value }) => value.join(' ')}</RangeSliderOutput>
      </div>
      <RangeSliderControl>
        <RangeSliderTrack>
          <RangeSliderRange />
        </RangeSliderTrack>
        {values.map((_, index) => (
          <RangeSliderThumb key={index} index={index}>
            <RangeSliderInput index={index} />
          </RangeSliderThumb>
        ))}
      </RangeSliderControl>
    </RangeSlider>
  )
}

describe('RangeSlider', () => {
  it('should render!', async () => {
    render(<ComponentUnderTest />)
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
    render(<ComponentUnderTest dir="rtl" />)

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
})
