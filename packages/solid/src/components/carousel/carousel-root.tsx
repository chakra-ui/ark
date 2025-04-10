import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseCarouselProps, useCarousel } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

export interface CarouselRootBaseProps extends UseCarouselProps, PolymorphicProps<'div'> {}
export interface CarouselRootProps extends HTMLProps<'div'>, CarouselRootBaseProps {}

export const CarouselRoot = (props: CarouselRootProps) => {
  const [useCarouselProps, localProps] = createSplitProps<UseCarouselProps>()(props, [
    'allowMouseDrag',
    'autoplay',
    'defaultPage',
    'id',
    'ids',
    'inViewThreshold',
    'loop',
    'onAutoplayStatusChange',
    'onDragStatusChange',
    'onPageChange',
    'orientation',
    'padding',
    'page',
    'slideCount',
    'slidesPerMove',
    'slidesPerPage',
    'snapType',
    'spacing',
    'translations',
  ])
  const api = useCarousel(useCarouselProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <CarouselProvider value={api}>
      <ark.div {...mergedProps} />
    </CarouselProvider>
  )
}
