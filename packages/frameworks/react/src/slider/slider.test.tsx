import { sliderAnatomy } from '@ark-ui/anatomy'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import { vi } from 'vitest'
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  type SliderProps,
} from '.'
import { getExports } from '../setup-test'
import { SliderRange } from './slider-range'

const ComponentUnderTest = (props: SliderProps) => {
  const [value, setValue] = useState([-20, 20])
  return (
    <Slider min={-50} max={50} value={value} onValueChange={(e) => setValue(e.value)} {...props}>
      <SliderLabel>Quantity: </SliderLabel>
      <SliderOutput>{({ value }) => value.join(' ')}</SliderOutput>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        {value.map((_, index) => (
          <SliderThumb key={index} index={index} />
        ))}
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker value={-30}>*</SliderMarker>
        <SliderMarker value={0}>*</SliderMarker>
        <SliderMarker value={30}>*</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
  )
}

describe('Slider', () => {
  it('should render!', async () => {
    render(<ComponentUnderTest />)
  })

  it.each(getExports(sliderAnatomy))('should export %s', async (part) => {
    expect(Slider[part]).toBeDefined()
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

  it('should handle disabled state', async () => {
    render(<ComponentUnderTest disabled />)
    const [leftThumb, rightThumb] = screen.getAllByRole('slider', { hidden: true })
    expect(leftThumb).toHaveAttribute('aria-disabled', 'true')
    expect(rightThumb).toHaveAttribute('aria-disabled', 'true')
  })

  it('should emit correct onChange events', async () => {
    const onChange = vi.fn()
    render(<ComponentUnderTest onChange={onChange} />)
    const [leftThumb] = screen.getAllByRole('slider', { hidden: true })

    leftThumb.focus()
    await user.keyboard('[ArrowRight]')

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
  })
})
