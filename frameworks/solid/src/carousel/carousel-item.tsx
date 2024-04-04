import type { ItemProps } from '@zag-js/carousel'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'
import type { Assign } from '../types'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const CarouselItem = (props: CarouselItemProps) => {
  const [slideParams, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getItemProps(slideParams), localProps)

  return <ark.div {...mergedProps} />
}
