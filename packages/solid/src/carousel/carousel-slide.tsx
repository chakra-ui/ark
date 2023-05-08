import type { Assign } from '@polymorphic-factory/solid'
import type { SlideProps } from '@zag-js/carousel/dist/carousel.types'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideProps = Assign<HTMLArkProps<'div'>, SlideProps>

export const CarouselSlide = (props: CarouselSlideProps) => {
  const [slideProps, divProps] = createSplitProps<SlideProps>()(props, ['index'])
  const carousel = useCarouselContext()

  return <ark.div {...carousel().getSlideProps(slideProps)} {...divProps} />
}
