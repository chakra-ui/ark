import { RangeSlider } from './range-slider'
import { RangeSliderControl } from './range-slider-control'
import { RangeSliderInput } from './range-slider-input'
import { RangeSliderRange } from './range-slider-range'
import { RangeSliderThumb } from './range-slider-thumb'
import { RangeSliderTrack } from './range-slider-track'
import './range-slider.css'

export const Basic = () => (
  <RangeSlider min={-50} max={50}>
    <RangeSliderControl>
      <RangeSliderTrack>
        <RangeSliderRange />
      </RangeSliderTrack>
      <RangeSliderThumb index={0}>
        <RangeSliderInput index={0} />
      </RangeSliderThumb>
      <RangeSliderThumb index={1}>
        <RangeSliderInput index={1} />
      </RangeSliderThumb>
    </RangeSliderControl>
  </RangeSlider>
)
