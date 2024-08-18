'use client'
import type { Assign } from '@ark-ui/react'
import { ColorPicker } from '@ark-ui/react/color-picker'
import { type ColorPickerVariantProps, colorPicker } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(colorPicker)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, ColorPicker.RootProviderBaseProps>, ColorPickerVariantProps>
>(ColorPicker.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, ColorPicker.RootBaseProps>, ColorPickerVariantProps>
>(ColorPicker.Root, 'root')

export const AreaBackground = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.AreaBackgroundBaseProps>
>(ColorPicker.AreaBackground, 'areaBackground')

export const Area = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.AreaBaseProps>
>(ColorPicker.Area, 'area')

export const AreaThumb = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.AreaThumbBaseProps>
>(ColorPicker.AreaThumb, 'areaThumb')

export const ChannelInput = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, ColorPicker.ChannelInputBaseProps>
>(ColorPicker.ChannelInput, 'channelInput')

export const ChannelSliderLabel = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, ColorPicker.ChannelSliderLabelBaseProps>
>(ColorPicker.ChannelSliderLabel, 'channelSliderLabel')

export const ChannelSlider = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.ChannelSliderBaseProps>
>(ColorPicker.ChannelSlider, 'channelSlider')

export const ChannelSliderThumb = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.ChannelSliderThumbBaseProps>
>(ColorPicker.ChannelSliderThumb, 'channelSliderThumb')

export const ChannelSliderTrack = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.ChannelSliderTrackBaseProps>
>(ColorPicker.ChannelSliderTrack, 'channelSliderTrack')

export const ChannelSliderValueText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, ColorPicker.ChannelSliderValueTextBaseProps>
>(ColorPicker.ChannelSliderValueText, 'channelSliderValueText')

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.ContentBaseProps>
>(ColorPicker.Content, 'content')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.ControlBaseProps>
>(ColorPicker.Control, 'control')

export const EyeDropperTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, ColorPicker.EyeDropperTriggerBaseProps>
>(ColorPicker.EyeDropperTrigger, 'eyeDropperTrigger')

export const FormatSelect = withContext<
  HTMLSelectElement,
  Assign<HTMLStyledProps<'select'>, ColorPicker.FormatSelectBaseProps>
>(ColorPicker.FormatSelect, 'formatSelect')

export const FormatTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, ColorPicker.FormatTriggerBaseProps>
>(ColorPicker.FormatTrigger, 'formatTrigger')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, ColorPicker.LabelBaseProps>
>(ColorPicker.Label, 'label')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.PositionerBaseProps>
>(ColorPicker.Positioner, 'positioner')

export const SwatchGroup = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.SwatchGroupBaseProps>
>(ColorPicker.SwatchGroup, 'swatchGroup')

export const SwatchIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.SwatchIndicatorBaseProps>
>(ColorPicker.SwatchIndicator, 'swatchIndicator')

export const Swatch = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.SwatchBaseProps>
>(ColorPicker.Swatch, 'swatch')

export const SwatchTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, ColorPicker.SwatchTriggerBaseProps>
>(ColorPicker.SwatchTrigger, 'swatchTrigger')

export const TransparencyGrid = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.TransparencyGridBaseProps>
>(ColorPicker.TransparencyGrid, 'transparencyGrid')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, ColorPicker.TriggerBaseProps>
>(ColorPicker.Trigger, 'trigger')

export const ValueSwatch = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.ValueSwatchBaseProps>
>(ColorPicker.ValueSwatch, 'swatch')

export const ValueText = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'span'>, ColorPicker.ValueTextBaseProps>
>(ColorPicker.ValueText, 'valueText')

export const View = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ColorPicker.ViewBaseProps>
>(ColorPicker.View, 'view')

export {
  ColorPickerContext as Context,
  ColorPickerHiddenInput as HiddenInput,
} from '@ark-ui/react/color-picker'
