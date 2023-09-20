import { sliderAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { getParts } from '../setup-test'
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderOutput,
  SliderRange,
  SliderThumb,
  SliderTrack,
  type SliderProps,
} from './'

const ComponentUnderTest = (props: SliderProps) => {
  return (
    <Slider min={-50} max={50} defaultValue={0} {...props}>
      {(api) => (
        <>
          <SliderLabel>Label</SliderLabel>
          <Slider.Output>{api.value}</Slider.Output>
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb />
          </SliderControl>
          <SliderMarkerGroup>
            <SliderMarker value={-30}>*</SliderMarker>
            <SliderMarker value={0}>*</SliderMarker>
            <SliderMarker value={30}>*</SliderMarker>
          </SliderMarkerGroup>
        </>
      )}
    </Slider>
  )
}

describe('Slider', () => {
  it.each(getParts(sliderAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
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

  it('should allow access to context with children render prop for Select', () => {
    render(
      <Slider min={-50} max={50} defaultValue={22}>
        {(context) => <div data-testid="slider-value">{JSON.stringify(context.value)}</div>}
      </Slider>,
    )
    expect(screen.getByTestId('slider-value')).toHaveTextContent('22')
  })

  it('should allow access to context with children render prop for SelectOutput', () => {
    render(
      <Slider min={-50} max={50} defaultValue={22}>
        <SliderOutput>
          {(context) => <div data-testid="slider-value">{JSON.stringify(context.value)}</div>}
        </SliderOutput>
      </Slider>,
    )
    expect(screen.getByTestId('slider-value')).toHaveTextContent('22')
  })
})
