'use client'
import { ColorPicker } from '@ark-ui/react/color-picker'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { colorPicker } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(colorPicker)

export const Root = withProvider(styled(ColorPicker.Root), 'root')
export const Area = withContext(styled(ColorPicker.Area), 'area')
export const AreaBackground = withContext(styled(ColorPicker.AreaBackground), 'areaBackground')
export const AreaThumb = withContext(styled(ColorPicker.AreaThumb), 'areaThumb')
export const ChannelInput = withContext(styled(ColorPicker.ChannelInput), 'channelInput')
export const ChannelSlider = withContext(styled(ColorPicker.ChannelSlider), 'channelSlider')
export const ChannelSliderThumb = withContext(
  styled(ColorPicker.ChannelSliderThumb),
  'channelSliderThumb',
)
export const ChannelSliderTrack = withContext(
  styled(ColorPicker.ChannelSliderTrack),
  'channelSliderTrack',
)
export const Content = withContext(styled(ColorPicker.Content), 'content')
export const Control = withContext(styled(ColorPicker.Control), 'control')
export const EyeDropperTrigger = withContext(
  styled(ColorPicker.EyeDropperTrigger),
  'eyeDropperTrigger',
)
export const FormatSelect = withContext(styled(ColorPicker.FormatSelect), 'formatSelect')
export const FormatTrigger = withContext(styled(ColorPicker.FormatTrigger), 'formatTrigger')
export const Label = withContext(styled(ColorPicker.Label), 'label')
export const Positioner = withContext(styled(ColorPicker.Positioner), 'positioner')
export const Swatch = withContext(styled(ColorPicker.Swatch), 'swatch')
export const SwatchGroup = withContext(styled(ColorPicker.SwatchGroup), 'swatchGroup')
export const SwatchIndicator = withContext(styled(ColorPicker.SwatchIndicator), 'swatchIndicator')
export const SwatchTrigger = withContext(styled(ColorPicker.SwatchTrigger), 'swatchTrigger')
export const TransparencyGrid = withContext(
  styled(ColorPicker.TransparencyGrid),
  'transparencyGrid',
)
export const Trigger = withContext(styled(ColorPicker.Trigger), 'trigger')
export const ValueText = withContext(styled(ColorPicker.ValueText), 'valueText')
export const View = withContext(styled(ColorPicker.View), 'view')
export const Context = ColorPicker.Context

export interface RootProps extends ComponentProps<typeof Root> {}
export interface AreaProps extends ComponentProps<typeof Area> {}
export interface AreaBackgroundProps extends ComponentProps<typeof AreaBackground> {}
export interface AreaThumbProps extends ComponentProps<typeof AreaThumb> {}
export interface ChannelInputProps extends ComponentProps<typeof ChannelInput> {}
export interface ChannelSliderProps extends ComponentProps<typeof ChannelSlider> {}
export interface ChannelSliderThumbProps extends ComponentProps<typeof ChannelSliderThumb> {}
export interface ChannelSliderTrackProps extends ComponentProps<typeof ChannelSliderTrack> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface EyeDropperTriggerProps extends ComponentProps<typeof EyeDropperTrigger> {}
export interface FormatSelectProps extends ComponentProps<typeof FormatSelect> {}
export interface FormatTriggerProps extends ComponentProps<typeof FormatTrigger> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface SwatchProps extends ComponentProps<typeof Swatch> {}
export interface SwatchGroupProps extends ComponentProps<typeof SwatchGroup> {}
export interface SwatchIndicatorProps extends ComponentProps<typeof SwatchIndicator> {}
export interface SwatchTriggerProps extends ComponentProps<typeof SwatchTrigger> {}
export interface TransparencyGridProps extends ComponentProps<typeof TransparencyGrid> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
export interface ValueTextProps extends ComponentProps<typeof ValueText> {}
export interface ViewProps extends ComponentProps<typeof View> {}
