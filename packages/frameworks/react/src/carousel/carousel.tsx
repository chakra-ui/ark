import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { CarouselProvider } from './carousel-context'
import { useCarousel, type UseCarouselProps, type UseCarouselReturn } from './use-carousel'

export interface CarouselProps
  extends Assign<
    Assign<
      HTMLArkProps<'div'>,
      {
        children?: ReactNode | ((api: UseCarouselReturn) => ReactNode)
      }
    >,
    UseCarouselProps
  > {}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>((props, ref) => {
  const [useCarouselProps, { children, ...divProps }] = createSplitProps<UseCarouselProps>()(
    props,
    [
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
    ],
  )
  const api = useCarousel(useCarouselProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  const view = runIfFn(children, api)

  return (
    <CarouselProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </CarouselProvider>
  )
})

Carousel.displayName = 'Carousel'
