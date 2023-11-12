import * as Ark from '@ark-ui/react/src/carousel'
import { styled } from 'styled-system/jsx'
import { carousel, type CarouselVariantProps } from 'styled-system/recipes'
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
export const CarouselItem = withContext(styled(Ark.Carousel.Item), 'item')
export const CarouselItemGroup = withContext(styled(Ark.Carousel.ItemGroup), 'itemGroup')
export const CarouselNextTrigger = withContext(styled(Ark.Carousel.NextTrigger), 'nextTrigger')
export const CarouselPrevTrigger = withContext(styled(Ark.Carousel.PrevTrigger), 'prevTrigger')
export const CarouselViewport = withContext(styled(Ark.Carousel.Viewport), 'viewport')

export const Carousel = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  Control: CarouselControl,
  Indicator: CarouselIndicator,
  IndicatorGroup: CarouselIndicatorGroup,
  Item: CarouselItem,
  ItemGroup: CarouselItemGroup,
  NextTrigger: CarouselNextTrigger,
  PrevTrigger: CarouselPrevTrigger,
  Viewport: CarouselViewport,
})
