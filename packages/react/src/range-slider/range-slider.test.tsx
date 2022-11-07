import { render } from '@testing-library/react'
import { RangeSlider, type RangeSliderProps } from './range-slider'
import { RangeSliderControl } from './range-slider-control'
import { RangeSliderInput } from './range-slider-input'
import { RangeSliderRange } from './range-slider-range'
import { RangeSliderThumb } from './range-slider-thumb'
import { RangeSliderTrack } from './range-slider-track'

const ComponentUnderTest = (props: RangeSliderProps) => (
  <RangeSlider min={-50} max={50} defaultValue={['10', '20']} {...props}>
    <RangeSliderControl>
      <RangeSliderTrack>
        <RangeSliderRange />
      </RangeSliderTrack>
      <RangeSliderThumb index={0}>
        <RangeSliderInput index={0} />
      </RangeSliderThumb>
    </RangeSliderControl>
  </RangeSlider>
)

describe('RangeSlider', () => {
  it('should render!', async () => {
    render(<ComponentUnderTest />)
  })
})
