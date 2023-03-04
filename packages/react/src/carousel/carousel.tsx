import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { CarouselContext, CarouselProvider } from './carousel-context'
import { useCarousel, UseCarouselProps } from './use-carousel'

export type CarouselProps = Assign<
  Omit<HTMLArkProps<'div'>, 'children'> & {
    children: ReactNode | ((pages: CarouselContext) => ReactNode)
  },
  UseCarouselProps
>

export const Carousel = forwardRef<'div', CarouselProps>((props, ref) => {
  const [useCarouselProps, { children, ...divProps }] = createSplitProps<UseCarouselProps>()(
    props,
    [
      'align',
      'dir',
      'getRootNode',
      'id',
      'index',
      'loop',
      'onSlideChange',
      'orientation',
      'slidesPerView',
      'spacing',
    ],
  )
  const carousel = useCarousel(useCarouselProps)
  const mergedProps = mergeProps(carousel.rootProps, divProps)

  const view = runIfFn(children, carousel)

  return (
    <CarouselProvider value={carousel}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </CarouselProvider>
  )
})
