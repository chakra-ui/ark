import type { ItemProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const CarouselItem = (props: CarouselItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} />
}
