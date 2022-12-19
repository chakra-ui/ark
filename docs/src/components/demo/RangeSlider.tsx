import {
  RangeSlider,
  RangeSliderControl,
  RangeSliderMarker,
  RangeSliderMarkerGroup,
  RangeSliderRange,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@ark-ui/react'
import { slider } from '../../../panda/recipes'

export const DemoRangeSlider = () => (
  <RangeSlider min={0} max={100} defaultValue={[33, 66]} className={slider()}>
    <RangeSliderControl>
      <RangeSliderTrack>
        <RangeSliderRange />
      </RangeSliderTrack>
      {[0, 1].map((i) => (
        <RangeSliderThumb key={i} index={i} />
      ))}
    </RangeSliderControl>
    <RangeSliderMarkerGroup>
      <RangeSliderMarker value={25}>25</RangeSliderMarker>
      <RangeSliderMarker value={50}>50</RangeSliderMarker>
      <RangeSliderMarker value={75}>75</RangeSliderMarker>
    </RangeSliderMarkerGroup>
  </RangeSlider>
)
