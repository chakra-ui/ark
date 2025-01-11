'use client'
import type { Assign } from '@ark-ui/react'
import { Tour } from '@ark-ui/react/tour'
import { type TourVariantProps, tour } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(tour)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider<Assign<Tour.RootProps, TourVariantProps>>(Tour.Root)

export const Backdrop = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.BackdropBaseProps>
>(Tour.Backdrop, 'backdrop')

export const Spotlight = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.SpotlightBaseProps>
>(Tour.Spotlight, 'spotlight')

export const CloseTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Tour.CloseTriggerBaseProps>
>(Tour.CloseTrigger, 'closeTrigger')

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.ContentBaseProps>
>(Tour.Content, 'content')

export const Description = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.DescriptionBaseProps>
>(Tour.Description, 'description')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.PositionerBaseProps>
>(Tour.Positioner, 'positioner')

export const Title = withContext<
  HTMLHeadingElement,
  Assign<HTMLStyledProps<'h2'>, Tour.TitleBaseProps>
>(Tour.Title, 'title')

export const Arrow = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.ArrowBaseProps>
>(Tour.Arrow, 'arrow')

export const ArrowTip = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.ArrowTipBaseProps>
>(Tour.ArrowTip, 'arrowTip')

export const ProgressText = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.ProgressTextBaseProps>
>(Tour.ProgressText, 'progressText')

export const ActionTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Tour.ActionTriggerBaseProps>
>(Tour.ActionTrigger, 'actionTrigger')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Tour.ControlBaseProps>
>(Tour.Control, 'control')

export const Context = Tour.Context
export const Actions = Tour.Actions

export type StepDetails = Tour.StepDetails
