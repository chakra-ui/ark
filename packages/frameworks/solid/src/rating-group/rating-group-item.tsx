import type { ItemProps, ItemState } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/solid'
import { createMemo, type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupItemProvider } from './rating-group-item-context'

interface ElementProps extends ItemProps {
  children?: JSX.Element | ((state: Accessor<ItemState>) => JSX.Element)
}

export interface RatingGroupItemProps extends Assign<HTMLArkProps<'span'>, ElementProps> {}

export const RatingGroupItem: ArkComponent<'span', ElementProps> = (
  props: RatingGroupItemProps,
) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])

  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  const itemState = createMemo(() => api().getItemState(itemProps))
  const getChildren = () => runIfFn(localProps.children, itemState)

  return (
    <RatingGroupItemProvider value={itemProps}>
      <ark.span {...mergedProps}>{getChildren()}</ark.span>
    </RatingGroupItemProvider>
  )
}
