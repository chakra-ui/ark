import { ColorPicker as ColorPickerRoot, type ColorPickerProps } from './color-picker'
import { ColorPickerArea, type ColorPickerAreaProps } from './color-picker-area'
import { useColorPickerAreaContext } from './color-picker-area-context'
import {
  ColorPickerAreaGradient,
  type ColorPickerAreaGradientProps,
} from './color-picker-area-gradient'
import { ColorPickerAreaThumb, type ColorPickerAreaThumbProps } from './color-picker-area-thumb'
import {
  ColorPickerChannelInput,
  type ColorPickerChannelInputProps,
} from './color-picker-channel-input'
import {
  ColorPickerChannelSliderBackground,
  type ColorPickerChannelSliderBackgroundProps,
} from './color-picker-channel-slider-background'
import {
  ColorPickerChannelSliderThumb,
  type ColorPickerChannelSliderThumbProps,
} from './color-picker-channel-slider-thumb'
import {
  ColorPickerChannelSliderTrack,
  type ColorPickerChannelSliderTrackProps,
} from './color-picker-channel-slider-track'
import { ColorPickerContent, type ColorPickerContentProps } from './color-picker-content'
import { useColorPickerContext } from './color-picker-context'
import {
  ColorPickerEyeDropperTrigger,
  type ColorPickerEyeDropperTriggerProps,
} from './color-picker-eye-dropper-trigger'
import { ColorPickerSwatch, type ColorPickerSwatchProps } from './color-picker-swatch'
import {
  ColorPickerSwatchBackground,
  type ColorPickerSwatchBackgroundProps,
} from './color-picker-swatch-background'
import { useColorPickerSwatchContext } from './color-picker-swatch-context'
import {
  ColorPickerSwatchGroup,
  type ColorPickerSwatchGroupProps,
} from './color-picker-swatch-group'
import { colorPickerAnatomy } from './color-picker.anatomy'

const ColorPicker = Object.assign(ColorPickerRoot, {
  Root: ColorPickerRoot,
  Area: ColorPickerArea,
  AreaGradient: ColorPickerAreaGradient,
  AreaThumb: ColorPickerAreaThumb,
  ChannelInput: ColorPickerChannelInput,
  ChannelSliderBackground: ColorPickerChannelSliderBackground,
  ChannelSliderThumb: ColorPickerChannelSliderThumb,
  ChannelSliderTrack: ColorPickerChannelSliderTrack,
  Content: ColorPickerContent,
  EyeDropperTrigger: ColorPickerEyeDropperTrigger,
  Swatch: ColorPickerSwatch,
  SwatchBackground: ColorPickerSwatchBackground,
  SwatchGroup: ColorPickerSwatchGroup,
})
export {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaGradient,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSliderBackground,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatch,
  ColorPickerSwatchBackground,
  ColorPickerSwatchGroup,
  colorPickerAnatomy,
  useColorPickerAreaContext,
  useColorPickerContext,
  useColorPickerSwatchContext,
}
export type {
  ColorPickerAreaGradientProps,
  ColorPickerAreaProps,
  ColorPickerAreaThumbProps,
  ColorPickerChannelInputProps,
  ColorPickerChannelSliderBackgroundProps,
  ColorPickerChannelSliderThumbProps,
  ColorPickerChannelSliderTrackProps,
  ColorPickerContentProps,
  ColorPickerEyeDropperTriggerProps,
  ColorPickerProps,
  ColorPickerSwatchBackgroundProps,
  ColorPickerSwatchGroupProps,
  ColorPickerSwatchProps,
}
