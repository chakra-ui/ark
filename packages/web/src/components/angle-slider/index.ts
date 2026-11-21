import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/angle-slider'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type {
  AngleSliderLabel,
  AngleSliderControl,
  AngleSliderThumb,
  AngleSliderValueText,
  AngleSliderMarkerGroup,
  AngleSliderMarker,
  AngleSliderHiddenInput,
} from './parts.js'

export type { Api as AngleSliderApi } from '@zag-js/angle-slider'
export interface AngleSliderElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-angle-slider': AngleSliderElement
    'ark-angle-slider-label': InstanceType<typeof AngleSliderLabel>
    'ark-angle-slider-control': InstanceType<typeof AngleSliderControl>
    'ark-angle-slider-thumb': InstanceType<typeof AngleSliderThumb>
    'ark-angle-slider-value-text': InstanceType<typeof AngleSliderValueText>
    'ark-angle-slider-marker-group': InstanceType<typeof AngleSliderMarkerGroup>
    'ark-angle-slider-marker': InstanceType<typeof AngleSliderMarker>
    'ark-angle-slider-hidden-input': InstanceType<typeof AngleSliderHiddenInput>
  }
}

export type AngleSliderEventMap = CallbackEvents<Props>
