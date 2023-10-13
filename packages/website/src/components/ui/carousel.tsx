import * as Ark from '@ark-ui/react/src/carousel'
import { styled } from '@ark-ui/styled-system/jsx'
import { carousel, type CarouselVariantProps } from '@ark-ui/styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(carousel)

export * from '@ark-ui/react/src/carousel'
export type CarouselProps = Ark.CarouselProps & CarouselVariantProps

const CarouselRoot = withProvider(styled(Ark.Carousel.Root), 'root')
export const CarouselControl = withContext(styled(Ark.Carousel.Control), 'control')
export const CarouselIndicator = withContext(styled(Ark.Carousel.Indicator), 'indicator')
export const CarouselIndicatorGroup = withContext(
  styled(Ark.Carousel.IndicatorGroup),
  'indicatorGroup',
)
export const CarouselNextTrigger = withContext(styled(Ark.Carousel.NextTrigger), 'nextSlideTrigger')
export const CarouselPrevTrigger = withContext(styled(Ark.Carousel.PrevTrigger), 'prevSlideTrigger')
export const CarouselItem = withContext(styled(Ark.Carousel.Item), 'slide')
export const CarouselItemGroup = withContext(styled(Ark.Carousel.ItemGroup), 'slideGroup')
export const CarouselViewport = withContext(styled(Ark.Carousel.Viewport), 'viewport')

export const Carousel = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  Control: CarouselControl,
  Indicator: CarouselIndicator,
  IndicatorGroup: CarouselIndicatorGroup,
  NextTrigger: CarouselNextTrigger,
  PrevTrigger: CarouselPrevTrigger,
  Item: CarouselItem,
  ItemGroup: CarouselItemGroup,
  Viewport: CarouselViewport,
})
