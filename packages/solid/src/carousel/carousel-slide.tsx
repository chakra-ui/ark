import type { SlideProps } from '@zag-js/carousel/dist/carousel.types'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideProps = Assign<HTMLArkProps<'div'>, SlideProps>

export const CarouselSlide = (props: CarouselSlideProps) => {
  const [slideParams, localProps] = createSplitProps<SlideProps>()(props, ['index'])
  const carousel = useCarouselContext()
  const sliderProps = mergeProps(() => carousel().getSlideProps(slideParams), localProps)
  return <ark.div {...sliderProps} />
}
