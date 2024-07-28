'use client'
import type { Assign } from '@ark-ui/react'
import { Slider } from '@ark-ui/react/slider'
import { type SliderVariantProps, slider } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(slider)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Slider.RootProviderBaseProps>, SliderVariantProps>
>(Slider.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Slider.RootBaseProps>, SliderVariantProps>
>(Slider.Root, 'root')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Slider.ControlBaseProps>
>(Slider.Control, 'control')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Slider.LabelBaseProps>
>(Slider.Label, 'label')

export const MarkerGroup = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Slider.MarkerGroupBaseProps>
>(Slider.MarkerGroup, 'markerGroup')

export const Marker = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Slider.MarkerBaseProps>
>(Slider.Marker, 'marker')

export const Range = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Slider.RangeBaseProps>
>(Slider.Range, 'range')

export const Thumb = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Slider.ThumbBaseProps>
>(Slider.Thumb, 'thumb')

export const Track = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Slider.TrackBaseProps>
>(Slider.Track, 'track')

export const ValueText = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'span'>, Slider.ValueTextBaseProps>
>(Slider.ValueText, 'valueText')

export {
  SliderContext as Context,
  SliderHiddenInput as HiddenInput,
} from '@ark-ui/react/slider'
