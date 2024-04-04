import type { IndicatorProps } from '@zag-js/carousel'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'
import type { Assign } from '../types'
import { useCarouselContext } from './use-carousel-context'

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
