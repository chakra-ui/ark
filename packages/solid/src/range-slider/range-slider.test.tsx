import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { createSignal } from 'solid-js'
import {
  RangeSlider,
  RangeSliderControl,
  RangeSliderLabel,
  RangeSliderMarker,
  RangeSliderMarkerGroup,
  RangeSliderOutput,
  RangeSliderRange,
  RangeSliderThumb,
  RangeSliderTrack,
  type RangeSliderProps,
} from './'

const ComponentUnderTest = (props: RangeSliderProps) => {
  const [values, setValues] = createSignal([-20, 20])
  return (
    <RangeSlider
      min={-50}
      max={50}
      value={values()}
      onChange={(e) => setValues(e.value)}
      {...props}
    >
      <RangeSliderLabel>Quantity: </RangeSliderLabel>
      <RangeSliderOutput>{(api) => api().value.join(' ')}</RangeSliderOutput>
      <RangeSliderControl>
        <RangeSliderTrack>
          <RangeSliderRange />
        </RangeSliderTrack>
        <RangeSliderThumb index={() => 0} data-testid="left-thumb" />
        <RangeSliderThumb index={() => 1} data-testid="right-thumb" />
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
    render(() => <ComponentUnderTest />)
  })

  it('should be possible to control it with the arrow keys', async () => {
    render(() => <ComponentUnderTest />)

    screen.getByTestId('left-thumb').focus()
    await user.keyboard('[ArrowRight]')

    expect(screen.getByTestId('left-thumb')).toHaveAttribute('aria-valuenow', '-19')
  })
})
