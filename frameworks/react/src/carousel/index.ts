import type { SlideChangeDetails as CarouselSlideChangeDetails } from '@zag-js/carousel'
import { CarouselContext, type CarouselContextProps } from './carousel-context'
import { CarouselControl, type CarouselControlProps } from './carousel-control'
import { CarouselIndicator, type CarouselIndicatorProps } from './carousel-indicator'
import {
  CarouselIndicatorGroup,
  type CarouselIndicatorGroupProps,
} from './carousel-indicator-group'
import { CarouselItem, type CarouselItemProps } from './carousel-item'
import { CarouselItemGroup, type CarouselItemGroupProps } from './carousel-item-group'
import { CarouselNextTrigger, type CarouselNextTriggerProps } from './carousel-next-trigger'
import { CarouselPrevTrigger, type CarouselPrevTriggerProps } from './carousel-prev-trigger'
import { CarouselRoot, type CarouselRootProps } from './carousel-root'
import { CarouselViewport, type CarouselViewportProps } from './carousel-viewport'
import { useCarouselContext, type UseCarouselContext } from './use-carousel-context'

export * as Carousel from './carousel'
export {
  CarouselContext,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselRoot,
  CarouselViewport,
  useCarouselContext,
}
export type {
  CarouselContextProps,
  CarouselControlProps,
  CarouselIndicatorGroupProps,
  CarouselIndicatorProps,
  CarouselItemGroupProps,
  CarouselItemProps,
  CarouselNextTriggerProps,
  CarouselPrevTriggerProps,
  CarouselRootProps,
  CarouselSlideChangeDetails,
  CarouselViewportProps,
  UseCarouselContext,
}
