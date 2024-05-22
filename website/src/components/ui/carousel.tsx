'use client'
import type { Assign } from '@ark-ui/react'
import { Carousel } from '@ark-ui/react/carousel'
import { type CarouselVariantProps, carousel } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(carousel)

export interface RootProps
  extends Assign<JsxStyleProps, Carousel.RootProps>,
    CarouselVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(Carousel.Root, 'root')

export const Control = withContext<HTMLDivElement, Assign<JsxStyleProps, Carousel.ControlProps>>(
  Carousel.Control,
  'control',
)

export const IndicatorGroup = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Carousel.IndicatorGroupProps>
>(Carousel.IndicatorGroup, 'indicatorGroup')

export const Indicator = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Carousel.IndicatorProps>
>(Carousel.Indicator, 'indicator')

export const ItemGroup = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Carousel.ItemGroupProps>
>(Carousel.ItemGroup, 'itemGroup')

export const Item = withContext<HTMLDivElement, Assign<JsxStyleProps, Carousel.ItemProps>>(
  Carousel.Item,
  'item',
)

export const NextTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Carousel.NextTriggerProps>
>(Carousel.NextTrigger, 'nextTrigger')

export const PrevTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Carousel.PrevTriggerProps>
>(Carousel.PrevTrigger, 'prevTrigger')

export const Viewport = withContext<HTMLDivElement, Assign<JsxStyleProps, Carousel.ViewportProps>>(
  Carousel.Viewport,
  'viewport',
)

export {
  CarouselContext as Context,
  type CarouselContextProps as ContextProps,
} from '@ark-ui/react/carousel'
