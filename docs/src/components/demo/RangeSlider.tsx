import {
  RangeSlider,
  RangeSliderControl,
  RangeSliderMarker,
  RangeSliderMarkerGroup,
  RangeSliderOutput,
  RangeSliderRange,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@ark-ui/react'
import { slider } from '../../../panda/recipes'

export const DemoRangeSlider = () => (
  <RangeSlider min={-50} max={50} defaultValue={[-10, 10]} className={slider({})}>
    <RangeSliderOutput>{({ value }) => value.join(' ')}</RangeSliderOutput>
    <RangeSliderControl>
      <RangeSliderTrack>
        <RangeSliderRange />
      </RangeSliderTrack>
      {[0, 1].map((_, index) => (
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
