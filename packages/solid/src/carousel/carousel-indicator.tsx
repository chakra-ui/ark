import type { SlideIndicatorProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorProps = Assign<HTMLArkProps<'button'>, SlideIndicatorProps>

export const CarouselIndicator = (props: CarouselIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<SlideIndicatorProps>()(props, [
    'index',
    'readOnly',
  ])
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(() => carousel().getIndicatorProps(indicatorProps), localProps)

  return <ark.button {...mergedProps} />
}
