import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/slider'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  SliderControl,
  SliderDraggingIndicator,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from './parts.js'

export type { Api as SliderApi } from '@zag-js/slider'
export interface SliderElement
  extends RootElement<Api, Props>, FunctionProperties<Props>, Pick<Props, 'ids'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-slider': SliderElement
    'ark-slider-value-text': InstanceType<typeof SliderValueText>
    'ark-slider-thumb': InstanceType<typeof SliderThumb>
    'ark-slider-dragging-indicator': InstanceType<typeof SliderDraggingIndicator>
    'ark-slider-hidden-input': InstanceType<typeof SliderHiddenInput>
    'ark-slider-marker': InstanceType<typeof SliderMarker>
    'ark-slider-label': InstanceType<typeof SliderLabel>
    'ark-slider-control': InstanceType<typeof SliderControl>
    'ark-slider-track': InstanceType<typeof SliderTrack>
    'ark-slider-range': InstanceType<typeof SliderRange>
    'ark-slider-marker-group': InstanceType<typeof SliderMarkerGroup>
  }
}

export type SliderEventMap = CallbackEvents<Props>
