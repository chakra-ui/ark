import type { ItemProps, ItemState } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupItemProvider } from './rating-group-item-context'

export interface RatingGroupItemProps
  extends Assign<
      HTMLArkProps<'span'>,
      {
        children?: ReactNode | ((state: ItemState) => ReactNode)
      }
    >,
    ItemProps {}

export const RatingGroupItem = forwardRef<HTMLSpanElement, RatingGroupItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, ['index'])

  const api = useRatingGroupContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  return (
    <RatingGroupItemProvider value={itemProps}>
      <ark.span {...mergedProps} ref={ref}>
        {view}
      </ark.span>
    </RatingGroupItemProvider>
  )
})

RatingGroupItem.displayName = 'RatingGroupItem'
