import type { ItemProps, ItemState } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselItemState extends ItemState {}

export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps<'div', CarouselItemState> {}
export interface CarouselItemProps extends HTMLProps<'div'>, CarouselItemBaseProps {}

export const CarouselItem = (props: CarouselItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index', 'snapAlign'])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} state={api().getItemState(itemProps)} />
}
