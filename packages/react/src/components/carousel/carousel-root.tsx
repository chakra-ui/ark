import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseCarouselProps, useCarousel } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

export interface CarouselRootBaseProps extends UseCarouselProps, PolymorphicProps {}
export interface CarouselRootProps extends HTMLProps<'div'>, CarouselRootBaseProps {}

export const CarouselRoot = forwardRef<HTMLDivElement, CarouselRootProps>((props, ref) => {
  const [useCarouselProps, localProps] = createSplitProps<UseCarouselProps>()(props, [
    'allowMouseDrag',
    'autoplay',
    'defaultIndex',
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
  const carousel = useCarousel(useCarouselProps)
  const mergedProps = mergeProps(carousel.getRootProps(), localProps)

  return (
    <CarouselProvider value={carousel}>
      <ark.div {...mergedProps} ref={ref} />
    </CarouselProvider>
  )
})

CarouselRoot.displayName = 'CarouselRoot'
