import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupItemProvider, type RatingGroupItemContext } from './rating-group-item-context'

export interface RatingGroupItemProps
  extends Assign<
      HTMLArkProps<'span'>,
      {
        children?: (state: RatingGroupItemContext) => JSX.Element | JSX.Element
      }
    >,
    ItemProps {}

export const RatingGroupItem = (props: RatingGroupItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useRatingGroupContext()
  const itemState = createMemo(() => api().getItemState(itemProps))
  const getChildren = () => runIfFn(localProps.children, itemState)

  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return (
    <RatingGroupItemProvider value={itemState}>
      <ark.span {...mergedProps}>{getChildren()}</ark.span>
    </RatingGroupItemProvider>
  )
}
