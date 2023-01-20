import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import {
  RangeSlider,
  RangeSliderControl,
  RangeSliderLabel,
  RangeSliderMarker,
  RangeSliderMarkerGroup,
  RangeSliderOutput,
  RangeSliderProps,
  RangeSliderRange,
  RangeSliderThumb,
  RangeSliderTrack,
} from './'

const ComponentUnderTest = (props: RangeSliderProps) => {
  const [value, setValue] = useState([-20, 20])
  return (
    <RangeSlider min={-50} max={50} value={value} onChange={(e) => setValue(e.value)} {...props}>
      <RangeSliderLabel>Quantity: </RangeSliderLabel>
      <RangeSliderOutput>{({ value }) => value.join(' ')}</RangeSliderOutput>
      <RangeSliderControl>
        <RangeSliderTrack>
          <RangeSliderRange />
        </RangeSliderTrack>
        {value.map((_, index) => (
          <RangeSliderThumb key={index} index={index} />
        ))}
      </RangeSliderControl>
      <RangeSliderMarkerGroup>
        <RangeSliderMarker value={-30}>*</RangeSliderMarker>
        <RangeSliderMarker value={0}>*</RangeSliderMarker>
        <RangeSliderMarker value={30}>*</RangeSliderMarker>
      </RangeSliderMarkerGroup>
    </RangeSlider>
  )
}

describe('RangeSlider', () => {
  it('should render!', async () => {
    render(<ComponentUnderTest />)
  })

  it.skip('should be possible to control it with the arrow keys', async () => {
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

  it.skip('should not be possible to overlap the right thumb with the left thumb', async () => {
    render(<ComponentUnderTest />)

    const [leftThumb] = screen.getAllByRole('slider', { hidden: true })
    leftThumb.focus()
    await user.keyboard('[End]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '20')

    await user.keyboard('[ArrowRight]')
    expect(leftThumb).toHaveAttribute('aria-valuenow', '20')
  })

  it.skip('should be possible to control it with the arrow keys in rtl mode', async () => {
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

  it.skip('should be possible to control it with the arrow keys in vertical mode', async () => {
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
