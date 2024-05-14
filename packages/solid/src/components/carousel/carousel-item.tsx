import type { ItemProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const CarouselItem = (props: CarouselItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} />
}
