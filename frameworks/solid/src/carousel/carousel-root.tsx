import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarousel, type UseCarouselProps } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

export interface CarouselRootProps extends Assign<HTMLArkProps<'div'>, UseCarouselProps> {}

export const CarouselRoot = (props: CarouselRootProps) => {
  const [useCarouselProps, localProps] = createSplitProps<UseCarouselProps>()(props, [
    'align',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'index',
    'loop',
    'onIndexChange',
    'orientation',
    'slidesPerView',
    'spacing',
  ])
  const api = useCarousel(useCarouselProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <CarouselProvider value={api}>
      <ark.div {...mergedProps()} />
    </CarouselProvider>
  )
}
