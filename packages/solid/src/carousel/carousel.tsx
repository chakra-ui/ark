import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { CarouselProvider } from './carousel-context'
import { useCarousel, type UseCarouselProps } from './use-carousel'

export type CarouselProps = Assign<HTMLArkProps<'div'>, UseCarouselProps>

export const Carousel = (props: CarouselProps) => {
  const [useCarouselProps, divProps] = createSplitProps<UseCarouselProps>()(props, [
    'align',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'index',
    'loop',
    'onSlideChange',
    'orientation',
    'slidesPerView',
    'spacing',
  ])
  const carousel = useCarousel(useCarouselProps)

  return (
    <CarouselProvider value={carousel}>
      <ark.div {...carousel().rootProps} {...divProps} />
    </CarouselProvider>
  )
}
