import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'
import { RatingGroupItemProvider } from './use-rating-group-item-context'

export interface RatingGroupItemProps extends Assign<HTMLArkProps<'span'>, ItemProps> {}

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
