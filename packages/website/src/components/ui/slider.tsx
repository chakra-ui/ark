import * as Ark from '@ark-ui/react/slider'
import { styled } from 'styled-system/jsx'
import { slider, type SliderVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(slider)

export * from '@ark-ui/react/slider'
export type SliderProps = Ark.SliderProps & SliderVariantProps

const SliderRoot = withProvider(styled(Ark.Slider.Root), 'root')
export const SliderControl = withContext(styled(Ark.Slider.Control), 'control')
export const SliderLabel = withContext(styled(Ark.Slider.Label), 'label')
export const SliderMarker = withContext(styled(Ark.Slider.Marker), 'marker')
export const SliderMarkerGroup = withContext(styled(Ark.Slider.MarkerGroup), 'markerGroup')
export const SliderOutput = withContext(styled(Ark.Slider.Output), 'output')
export const SliderRange = withContext(styled(Ark.Slider.Range), 'range')
export const SliderThumb = withContext(styled(Ark.Slider.Thumb), 'thumb')
export const SliderTrack = withContext(styled(Ark.Slider.Track), 'track')

export const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  Control: SliderControl,
  Label: SliderLabel,
  Marker: SliderMarker,
  MarkerGroup: SliderMarkerGroup,
  Output: SliderOutput,
  Range: SliderRange,
  Thumb: SliderThumb,
  Track: SliderTrack,
})
