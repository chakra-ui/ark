import * as Ark from '@ark-ui/react/carousel'
import { styled } from 'styled-system/jsx'
import { carousel, type CarouselVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(carousel)

export * from '@ark-ui/react/carousel'
export type CarouselProps = Ark.CarouselProps & CarouselVariantProps

const CarouselRoot = withProvider(styled(Ark.Carousel.Root), 'root')
export const CarouselControl = withContext(styled(Ark.Carousel.Control), 'control')
export const CarouselIndicator = withContext(styled(Ark.Carousel.Indicator), 'indicator')
export const CarouselIndicatorGroup = withContext(
  styled(Ark.Carousel.IndicatorGroup),
  'indicatorGroup',
)
export const CarouselNextSlideTrigger = withContext(
  styled(Ark.Carousel.NextSlideTrigger),
  'nextSlideTrigger',
)
export const CarouselPrevSlideTrigger = withContext(
  styled(Ark.Carousel.PrevSlideTrigger),
  'prevSlideTrigger',
)
export const CarouselSlide = withContext(styled(Ark.Carousel.Slide), 'slide')
export const CarouselSlideGroup = withContext(styled(Ark.Carousel.SlideGroup), 'slideGroup')
export const CarouselViewport = withContext(styled(Ark.Carousel.Viewport), 'viewport')

export const Carousel = Object.assign(CarouselRoot, {
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
