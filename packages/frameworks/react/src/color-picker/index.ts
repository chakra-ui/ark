import { ColorPicker as ColorPickerRoot, type ColorPickerProps } from './color-picker'
import { ColorPickerArea, type ColorPickerAreaProps } from './color-picker-area'
import {
  ColorPickerAreaBackground,
  type ColorPickerAreaBackgroundProps,
} from './color-picker-area-background'
import { useColorPickerAreaContext, type ColorPickerAreaContext } from './color-picker-area-context'
import { ColorPickerAreaThumb, type ColorPickerAreaThumbProps } from './color-picker-area-thumb'
import {
  ColorPickerChannelInput,
  type ColorPickerChannelInputProps,
} from './color-picker-channel-input'
import {
  ColorPickerChannelSlider,
  type ColorPickerChannelSliderProps,
} from './color-picker-channel-slider'
import {
  useColorPickerChannelSliderContext,
  type ColorPickerChannelSliderContext,
} from './color-picker-channel-slider-context'
import {
  ColorPickerChannelSliderThumb,
  type ColorPickerChannelSliderThumbProps,
} from './color-picker-channel-slider-thumb'
import {
  ColorPickerChannelSliderTrack,
  type ColorPickerChannelSliderTrackProps,
} from './color-picker-channel-slider-track'
import { ColorPickerContent, type ColorPickerContentProps } from './color-picker-content'
import { useColorPickerContext, type ColorPickerContext } from './color-picker-context'
import { ColorPickerControl, type ColorPickerControlProps } from './color-picker-control'
import {
  ColorPickerEyeDropperTrigger,
  type ColorPickerEyeDropperTriggerProps,
} from './color-picker-eye-dropper-trigger'
import {
  ColorPickerFormatSelect,
  type ColorPickerFormatSelectProps,
} from './color-picker-format-select'
import {
  ColorPickerFormatTrigger,
  type ColorPickerFormatTriggerProps,
} from './color-picker-format-trigger'
import { ColorPickerLabel, type ColorPickerLabelProps } from './color-picker-label'
import { ColorPickerPositioner, type ColorPickerPositionerProps } from './color-picker-positioner'
import { ColorPickerSwatch, type ColorPickerSwatchProps } from './color-picker-swatch'
import {
  ColorPickerSwatchGroup,
  type ColorPickerSwatchGroupProps,
} from './color-picker-swatch-group'
import {
  ColorPickerSwatchIndicator,
  type ColorPickerSwatchIndicatorProps,
} from './color-picker-swatch-indicator'
import {
  ColorPickerSwatchTrigger,
  type ColorPickerSwatchTriggerProps,
} from './color-picker-swatch-trigger'
import {
  ColorPickerTransparencyGrid,
  type ColorPickerTransparencyGridProps,
} from './color-picker-transparency-grid'
import { ColorPickerTrigger, type ColorPickerTriggerProps } from './color-picker-trigger'
import { ColorPickerValueText, type ColorPickerValueTextProps } from './color-picker-value-text'
import { ColorPickerView, type ColorPickerViewProps } from './color-picker-view'

const ColorPicker = Object.assign(ColorPickerRoot, {
  Root: ColorPickerRoot,
  Area: ColorPickerArea,
  AreaBackground: ColorPickerAreaBackground,
  AreaThumb: ColorPickerAreaThumb,
  ChannelInput: ColorPickerChannelInput,
  ChannelSlider: ColorPickerChannelSlider,
  ChannelSliderThumb: ColorPickerChannelSliderThumb,
  ChannelSliderTrack: ColorPickerChannelSliderTrack,
  Content: ColorPickerContent,
  Control: ColorPickerControl,
  EyeDropperTrigger: ColorPickerEyeDropperTrigger,
  FormatTrigger: ColorPickerFormatTrigger,
  FormatSelect: ColorPickerFormatSelect,
  Label: ColorPickerLabel,
  Positioner: ColorPickerPositioner,
  Swatch: ColorPickerSwatch,
  SwatchGroup: ColorPickerSwatchGroup,
  SwatchIndicator: ColorPickerSwatchIndicator,
  SwatchTrigger: ColorPickerSwatchTrigger,
  TransparencyGrid: ColorPickerTransparencyGrid,
  Trigger: ColorPickerTrigger,
  ValueText: ColorPickerValueText,
  View: ColorPickerView,
})
export {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSlider,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropperTrigger,
  ColorPickerFormatSelect,
  ColorPickerFormatTrigger,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
  ColorPickerSwatchIndicator,
  ColorPickerSwatchTrigger,
  ColorPickerTransparencyGrid,
  ColorPickerTrigger,
  ColorPickerValueText,
  ColorPickerView,
  useColorPickerAreaContext,
  useColorPickerChannelSliderContext,
  useColorPickerContext,
}
export type {
  ColorPickerAreaBackgroundProps,
  ColorPickerAreaContext,
  ColorPickerAreaProps,
  ColorPickerAreaThumbProps,
  ColorPickerChannelInputProps,
  ColorPickerChannelSliderContext,
  ColorPickerChannelSliderProps,
  ColorPickerChannelSliderThumbProps,
  ColorPickerChannelSliderTrackProps,
  ColorPickerContentProps,
  ColorPickerContext,
  ColorPickerControlProps,
  ColorPickerEyeDropperTriggerProps,
  ColorPickerFormatSelectProps,
  ColorPickerFormatTriggerProps,
  ColorPickerLabelProps,
  ColorPickerPositionerProps,
  ColorPickerProps,
  ColorPickerSwatchGroupProps,
  ColorPickerSwatchIndicatorProps,
  ColorPickerSwatchProps,
  ColorPickerSwatchTriggerProps,
  ColorPickerTransparencyGridProps,
  ColorPickerTriggerProps,
  ColorPickerValueTextProps,
  ColorPickerViewProps,
}
