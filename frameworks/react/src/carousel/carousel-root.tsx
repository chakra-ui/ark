import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useCarousel, type UseCarouselProps } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

export interface CarouselRootProps extends Assign<HTMLArkProps<'div'>, UseCarouselProps> {}

export const CarouselRoot = forwardRef<HTMLDivElement, CarouselRootProps>((props, ref) => {
  const [useCarouselProps, localProps] = createSplitProps<UseCarouselProps>()(props, [
    'align',
    'defaultIndex',
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
  const context = useCarousel(useCarouselProps)
  const mergedProps = mergeProps(context.rootProps, localProps)

  return (
    <CarouselProvider value={context}>
      <ark.div {...mergedProps} ref={ref} />
    </CarouselProvider>
  )
})

CarouselRoot.displayName = 'CarouselRoot'
