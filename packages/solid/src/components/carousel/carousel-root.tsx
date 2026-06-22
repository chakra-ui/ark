import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseCarouselProps, useCarousel } from './use-carousel.ts'
import { CarouselProvider } from './use-carousel-context.ts'

export interface CarouselRootBaseProps extends UseCarouselProps, PolymorphicProps<'div'> {}
export interface CarouselRootProps extends HTMLProps<'div'>, CarouselRootBaseProps {}

export const CarouselRoot = (props: CarouselRootProps) => {
  const [useCarouselProps, localProps] = createSplitProps<UseCarouselProps>()(props, [
    'allowMouseDrag',
    'autoPlay',
    'autoSize',
    'count',
    'defaultPage',
    'id',
    'ids',
    'inViewThreshold',
    'itemSpacing',
    'loop',
    'onAutoplayStatusChange',
    'onDragStatusChange',
    'onPageChange',
    'orientation',
    'page',
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
