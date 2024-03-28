import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRatingGroupContext } from './use-rating-group-context'
import { RatingGroupItemProvider } from './use-rating-group-item-context'

export interface RatingGroupItemProps extends Assign<HTMLArkProps<'span'>, ItemProps> {}

export const RatingGroupItem = forwardRef<HTMLSpanElement, RatingGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const context = useRatingGroupContext()
  const mergedProps = mergeProps(context.getItemProps(itemProps), localProps)
  const itemState = context.getItemState(itemProps)

  return (
    <RatingGroupItemProvider value={itemState}>
      <ark.span {...mergedProps} ref={ref} />
    </RatingGroupItemProvider>
  )
})

RatingGroupItem.displayName = 'RatingGroupItem'
