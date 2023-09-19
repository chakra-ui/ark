import { Carousel as CarouselRoot, type CarouselProps } from './carousel'
import { useCarouselContext, type CarouselContext } from './carousel-context'
import { CarouselControl, type CarouselControlProps } from './carousel-control'
import { CarouselIndicator, type CarouselIndicatorProps } from './carousel-indicator'
import {
  CarouselIndicatorGroup,
  type CarouselIndicatorGroupProps,
} from './carousel-indicator-group'
import {
  CarouselNextSlideTrigger,
  type CarouselNextSlideTriggerProps,
} from './carousel-next-slide-trigger'
import {
  CarouselPrevSlideTrigger,
  type CarouselPrevSlideTriggerProps,
} from './carousel-prev-slide-trigger'
import { CarouselSlide, type CarouselSlideProps } from './carousel-slide'
import { CarouselSlideGroup, type CarouselSlideGroupProps } from './carousel-slide-group'
import { CarouselViewport, type CarouselViewportProps } from './carousel-viewport'

const Carousel = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  Control: CarouselControl,
  Indicator: CarouselIndicator,
  IndicatorGroup: CarouselIndicatorGroup,
  NextSlideTrigger: CarouselNextSlideTrigger,
  PrevSlideTrigger: CarouselPrevSlideTrigger,
  Slide: CarouselSlide,
  SlideGroup: CarouselSlideGroup,
  Viewport: CarouselViewport,
})

export {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
  useCarouselContext,
}
export type {
  CarouselContext,
  CarouselControlProps,
  CarouselIndicatorGroupProps,
  CarouselIndicatorProps,
  CarouselNextSlideTriggerProps,
  CarouselPrevSlideTriggerProps,
  CarouselProps,
  CarouselSlideGroupProps,
  CarouselSlideProps,
  CarouselViewportProps,
}
