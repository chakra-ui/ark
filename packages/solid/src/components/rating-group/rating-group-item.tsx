import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/solid'
import { type JSX, createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'
import { RatingGroupItemProvider } from './use-rating-group-item-context'

export interface RatingGroupItemBaseProps extends ItemProps, PolymorphicProps<'span'> {}
export interface RatingGroupItemProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    RatingGroupItemBaseProps {}

export const RatingGroupItem = (props: RatingGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => api().getItemState(itemProps))

  return (
    <RatingGroupItemProvider value={itemState}>
      <ark.span {...mergedProps} />
    </RatingGroupItemProvider>
  )
}
