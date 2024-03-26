import type { IndicatorProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export interface CarouselIndicatorProps extends Assign<HTMLArkProps<'button'>, IndicatorProps> {}

export const CarouselIndicator = (props: CarouselIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, [
    'index',
    'readOnly',
  ])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getIndicatorProps(indicatorProps), localProps)

  return <ark.button {...mergedProps} />
}
