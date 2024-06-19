'use client'
import type { Assign } from '@ark-ui/react'
import { ColorPicker } from '@ark-ui/react/color-picker'
import { type ColorPickerVariantProps, colorPicker } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(colorPicker)

export interface RootProps
  extends Assign<JsxStyleProps, ColorPicker.RootProps>,
    ColorPickerVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(ColorPicker.Root, 'root')

export const AreaBackground = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.AreaBackgroundProps>
>(ColorPicker.AreaBackground, 'areaBackground')

export const Area = withContext<HTMLDivElement, Assign<JsxStyleProps, ColorPicker.AreaProps>>(
  ColorPicker.Area,
  'area',
)

export const AreaThumb = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.AreaThumbProps>
>(ColorPicker.AreaThumb, 'areaThumb')

export const ChannelInput = withContext<
  HTMLInputElement,
  Assign<JsxStyleProps, ColorPicker.ChannelInputProps>
>(ColorPicker.ChannelInput, 'channelInput')

export const ChannelSlider = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.ChannelSliderProps>
>(ColorPicker.ChannelSlider, 'channelSlider')

export const ChannelSliderThumb = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.ChannelSliderThumbProps>
>(ColorPicker.ChannelSliderThumb, 'channelSliderThumb')

export const ChannelSliderTrack = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.ChannelSliderTrackProps>
>(ColorPicker.ChannelSliderTrack, 'channelSliderTrack')

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, ColorPicker.ContentProps>>(
  ColorPicker.Content,
  'content',
)

export const Control = withContext<HTMLDivElement, Assign<JsxStyleProps, ColorPicker.ControlProps>>(
  ColorPicker.Control,
  'control',
)

export const EyeDropperTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, ColorPicker.EyeDropperTriggerProps>
>(ColorPicker.EyeDropperTrigger, 'eyeDropperTrigger')

export const FormatSelect = withContext<
  HTMLSelectElement,
  Assign<JsxStyleProps, ColorPicker.FormatSelectProps>
>(ColorPicker.FormatSelect, 'formatSelect')

export const FormatTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, ColorPicker.FormatTriggerProps>
>(ColorPicker.FormatTrigger, 'formatTrigger')

export const Label = withContext<HTMLLabelElement, Assign<JsxStyleProps, ColorPicker.LabelProps>>(
  ColorPicker.Label,
  'label',
)

export const Positioner = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.PositionerProps>
>(ColorPicker.Positioner, 'positioner')

export const SwatchGroup = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.SwatchGroupProps>
>(ColorPicker.SwatchGroup, 'swatchGroup')

export const SwatchIndicator = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.SwatchIndicatorProps>
>(ColorPicker.SwatchIndicator, 'swatchIndicator')

export const Swatch = withContext<HTMLDivElement, Assign<JsxStyleProps, ColorPicker.SwatchProps>>(
  ColorPicker.Swatch,
  'swatch',
)

export const SwatchTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, ColorPicker.SwatchTriggerProps>
>(ColorPicker.SwatchTrigger, 'swatchTrigger')

export const TransparencyGrid = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.TransparencyGridProps>
>(ColorPicker.TransparencyGrid, 'transparencyGrid')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, ColorPicker.TriggerProps>
>(ColorPicker.Trigger, 'trigger')

export const ValueText = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ColorPicker.ValueTextProps>
>(ColorPicker.ValueText, 'valueText')

export const View = withContext<HTMLDivElement, Assign<JsxStyleProps, ColorPicker.ViewProps>>(
  ColorPicker.View,
  'view',
)

export {
  ColorPickerContext as Context,
  ColorPickerHiddenInput as HiddenInput,
  type ColorPickerContextProps as ContextProps,
  type ColorPickerHiddenInputProps as HiddenInputProps,
} from '@ark-ui/react/color-picker'
