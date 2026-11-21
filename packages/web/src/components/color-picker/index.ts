import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/color-picker'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type {
  ColorPickerArea,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSlider,
  ColorPickerChannelSliderLabel,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerChannelSliderValueText,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropperTrigger,
  ColorPickerFormatSelect,
  ColorPickerFormatTrigger,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
  ColorPickerSwatchIndicator,
  ColorPickerSwatchTrigger,
  ColorPickerTransparencyGrid,
  ColorPickerTrigger,
  ColorPickerValueSwatch,
  ColorPickerValueText,
  ColorPickerView,
} from './parts.js'

export type { Api as ColorPickerApi, Color, ColorFormat } from '@zag-js/color-picker'
export { parse as parseColor } from '@zag-js/color-picker'
export interface ColorPickerElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'positioning'>,
    StateProperties<Props, 'format' | 'open'> {
  value: string
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-color-picker': ColorPickerElement
    'ark-color-picker-label': InstanceType<typeof ColorPickerLabel>
    'ark-color-picker-control': InstanceType<typeof ColorPickerControl>
    'ark-color-picker-trigger': InstanceType<typeof ColorPickerTrigger>
    'ark-color-picker-positioner': InstanceType<typeof ColorPickerPositioner>
    'ark-color-picker-content': InstanceType<typeof ColorPickerContent>
    'ark-color-picker-value-text': InstanceType<typeof ColorPickerValueText>
    'ark-color-picker-area': InstanceType<typeof ColorPickerArea>
    'ark-color-picker-area-background': InstanceType<typeof ColorPickerAreaBackground>
    'ark-color-picker-area-thumb': InstanceType<typeof ColorPickerAreaThumb>
    'ark-color-picker-channel-slider': InstanceType<typeof ColorPickerChannelSlider>
    'ark-color-picker-channel-slider-track': InstanceType<typeof ColorPickerChannelSliderTrack>
    'ark-color-picker-channel-slider-thumb': InstanceType<typeof ColorPickerChannelSliderThumb>
    'ark-color-picker-channel-slider-label': InstanceType<typeof ColorPickerChannelSliderLabel>
    'ark-color-picker-channel-slider-value-text': InstanceType<typeof ColorPickerChannelSliderValueText>
    'ark-color-picker-channel-input': InstanceType<typeof ColorPickerChannelInput>
    'ark-color-picker-transparency-grid': InstanceType<typeof ColorPickerTransparencyGrid>
    'ark-color-picker-swatch-group': InstanceType<typeof ColorPickerSwatchGroup>
    'ark-color-picker-swatch-trigger': InstanceType<typeof ColorPickerSwatchTrigger>
    'ark-color-picker-swatch': InstanceType<typeof ColorPickerSwatch>
    'ark-color-picker-swatch-indicator': InstanceType<typeof ColorPickerSwatchIndicator>
    'ark-color-picker-value-swatch': InstanceType<typeof ColorPickerValueSwatch>
    'ark-color-picker-eye-dropper-trigger': InstanceType<typeof ColorPickerEyeDropperTrigger>
    'ark-color-picker-format-trigger': InstanceType<typeof ColorPickerFormatTrigger>
    'ark-color-picker-format-select': InstanceType<typeof ColorPickerFormatSelect>
    'ark-color-picker-view': InstanceType<typeof ColorPickerView>
    'ark-color-picker-hidden-input': InstanceType<typeof ColorPickerHiddenInput>
  }
}

export type ColorPickerEventMap = CallbackEvents<Props>
