import type { ItemProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface CarouselItemProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    CarouselItemBaseProps {}

export const CarouselItem = (props: CarouselItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} />
}
