import type { SlideProps } from '@zag-js/carousel/dist/carousel.types'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorProps = Assign<HTMLArkProps<'button'>, SlideProps>

export const CarouselIndicator = (props: CarouselIndicatorProps) => {
  const [slideParams, localProps] = createSplitProps<SlideProps>()(props, ['index'])
  const carousel = useCarouselContext()
  const indicatorProps = mergeProps(() => carousel().getIndicatorProps(slideParams), localProps)

  return <ark.button {...indicatorProps} onClick={() => carousel().scrollTo(props.index) }/>
}
