import type { ItemProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface CarouselItemProps extends HTMLProps<'div'>, CarouselItemBaseProps {}

export const CarouselItem = (props: CarouselItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} />
}
