import type { ItemProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps {}
export interface CarouselItemProps extends HTMLProps<'div'>, CarouselItemBaseProps {}

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

CarouselItem.displayName = 'CarouselItem'
