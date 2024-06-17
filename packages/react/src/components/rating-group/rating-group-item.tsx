import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'
import { RatingGroupItemProvider } from './use-rating-group-item-context'

export interface RatingGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface RatingGroupItemProps
  extends HTMLAttributes<HTMLSpanElement>,
    RatingGroupItemBaseProps {}

export const RatingGroupItem = forwardRef<HTMLSpanElement, RatingGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(ratingGroup.getItemProps(itemProps), localProps)
  const itemState = ratingGroup.getItemState(itemProps)

  return (
    <RatingGroupItemProvider value={itemState}>
      <ark.span {...mergedProps} ref={ref} />
    </RatingGroupItemProvider>
  )
})

RatingGroupItem.displayName = 'RatingGroupItem'
