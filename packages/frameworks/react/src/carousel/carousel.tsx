import type { SlideChangeDetails } from '@zag-js/carousel'
import {
  CarouselContext as Context,
  type CarouselContextProps as ContextProps,
} from './carousel-context'
import {
  CarouselControl as Control,
  type CarouselControlProps as ControlProps,
} from './carousel-control'
import {
  CarouselIndicator as Indicator,
  type CarouselIndicatorProps as IndicatorProps,
} from './carousel-indicator'
import {
  CarouselIndicatorGroup as IndicatorGroup,
  type CarouselIndicatorGroupProps as IndicatorGroupProps,
} from './carousel-indicator-group'
import { CarouselItem as Item, type CarouselItemProps as ItemProps } from './carousel-item'
import {
  CarouselItemGroup as ItemGroup,
  type CarouselItemGroupProps as ItemGroupProps,
} from './carousel-item-group'
import {
  CarouselNextTrigger as NextTrigger,
  type CarouselNextTriggerProps as NextTriggerProps,
} from './carousel-next-trigger'
import {
  CarouselPrevTrigger as PrevTrigger,
  type CarouselPrevTriggerProps as PrevTriggerProps,
} from './carousel-prev-trigger'
import { CarouselRoot as Root, type CarouselRootProps as RootProps } from './carousel-root'
import {
  CarouselViewport as Viewport,
  type CarouselViewportProps as ViewportProps,
} from './carousel-viewport'

export {
  Context,
  Control,
  Indicator,
  IndicatorGroup,
  Item,
  ItemGroup,
  NextTrigger,
  PrevTrigger,
  Root,
  Viewport,
}
export type {
  ContextProps,
  ControlProps,
  IndicatorGroupProps,
  IndicatorProps,
  ItemGroupProps,
  ItemProps,
  NextTriggerProps,
  PrevTriggerProps,
  RootProps,
  SlideChangeDetails,
  ViewportProps,
}
