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
    'align',
    'defaultIndex',
    'id',
    'ids',
    'index',
    'loop',
    'onIndexChange',
    'orientation',
    'slidesPerView',
    'spacing',
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
