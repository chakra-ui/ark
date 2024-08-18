'use client'
import type { Assign } from '@ark-ui/react'
import { Progress } from '@ark-ui/react/progress'
import { type ProgressVariantProps, progress } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(progress)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Progress.RootProviderBaseProps>, ProgressVariantProps>
>(Progress.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Progress.RootBaseProps>, ProgressVariantProps>
>(Progress.Root, 'root')

export const Circle = withContext<
  SVGSVGElement,
  Assign<HTMLStyledProps<'svg'>, Progress.CircleBaseProps>
>(Progress.Circle, 'circle')

export const CircleRange = withContext<
  SVGCircleElement,
  Assign<HTMLStyledProps<'circle'>, Progress.CircleRangeBaseProps>
>(Progress.CircleRange, 'circleRange')

export const CircleTrack = withContext<
  SVGCircleElement,
  Assign<HTMLStyledProps<'circle'>, Progress.CircleTrackBaseProps>
>(Progress.CircleTrack, 'circleTrack')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Progress.LabelBaseProps>
>(Progress.Label, 'label')

export const Range = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Progress.RangeBaseProps>
>(Progress.Range, 'range')

export const Track = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Progress.TrackBaseProps>
>(Progress.Track, 'track')

export const ValueText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Progress.ValueTextBaseProps>
>(Progress.ValueText, 'valueText')

export const View = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Progress.ViewBaseProps>
>(Progress.View, 'view')

export { ProgressContext as Context } from '@ark-ui/react/progress'
