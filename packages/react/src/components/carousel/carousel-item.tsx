import type { ItemProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemBaseProps extends ItemProps {}
export interface CarouselItemProps extends Assign<HTMLArkProps<'div'>, CarouselItemBaseProps> {}

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

CarouselItem.displayName = 'CarouselItem'
