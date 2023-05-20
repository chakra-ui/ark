import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { CarouselProvider } from './carousel-context'
import { useCarousel, type UseCarouselProps } from './use-carousel'

export type CarouselProps = Assign<HTMLArkProps<'div'>, UseCarouselProps>

export const Carousel = (props: CarouselProps) => {
  const [useCarouselProps, localProps] = createSplitProps<UseCarouselProps>()(props, [
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
  const rootProps = mergeProps(() => carousel().rootProps, localProps)
  return (
    <CarouselProvider value={carousel}>
      <ark.div {...rootProps} />
    </CarouselProvider>
  )
}
