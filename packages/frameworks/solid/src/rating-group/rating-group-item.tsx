import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupItemProvider, type RatingGroupItemContext } from './rating-group-item-context'

export type RatingGroupItemProps = Assign<
  HTMLArkProps<'span'>,
  ItemProps & {
    children: (state: RatingGroupItemContext) => JSX.Element | JSX.Element
  }
>

export const RatingGroupItem = (props: RatingGroupItemProps) => {
  const [ratingParams, restProps] = createSplitProps<ItemProps>()(props, ['index'])
  const api = useRatingGroupContext()
  const itemState = api().getItemState(ratingParams)
  const mergedProps = mergeProps(() => api().getItemProps(ratingParams), restProps)

  const getChildren = () => runIfFn(restProps.children, itemState)

  return (
    <RatingGroupItemProvider value={itemState}>
      <ark.span {...mergedProps}>{getChildren()}</ark.span>
    </RatingGroupItemProvider>
  )
}
