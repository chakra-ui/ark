'use client'
import type { Assign } from '@ark-ui/react'
import { Carousel } from '@ark-ui/react/carousel'
import { type CarouselVariantProps, carousel } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(carousel)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Carousel.RootProviderBaseProps>, CarouselVariantProps>
>(Carousel.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Carousel.RootBaseProps>, CarouselVariantProps>
>(Carousel.Root, 'root')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Carousel.ControlBaseProps>
>(Carousel.Control, 'control')

export const IndicatorGroup = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Carousel.IndicatorGroupBaseProps>
>(Carousel.IndicatorGroup, 'indicatorGroup')

export const Indicator = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Carousel.IndicatorBaseProps>
>(Carousel.Indicator, 'indicator')

export const ItemGroup = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Carousel.ItemGroupBaseProps>
>(Carousel.ItemGroup, 'itemGroup')

export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Carousel.ItemBaseProps>
>(Carousel.Item, 'item')

export const NextTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Carousel.NextTriggerBaseProps>
>(Carousel.NextTrigger, 'nextTrigger')

export const PrevTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Carousel.PrevTriggerBaseProps>
>(Carousel.PrevTrigger, 'prevTrigger')

export const Viewport = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Carousel.ViewportBaseProps>
>(Carousel.Viewport, 'viewport')

export { CarouselContext as Context } from '@ark-ui/react/carousel'
