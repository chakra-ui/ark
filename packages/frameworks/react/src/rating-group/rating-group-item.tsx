import type { ItemProps } from '@zag-js/rating-group'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupItemProvider, type RatingGroupItemContext } from './rating-group-item-context'

export interface RatingGroupItemProps
  extends Assign<
    HTMLArkProps<'span'>,
    ItemProps & {
      children?: (state: RatingGroupItemContext) => ReactNode | ReactNode
    }
  > {}

export const RatingGroupItem = forwardRef<HTMLSpanElement, RatingGroupItemProps>((props, ref) => {
  const { children, index, ...divProps } = props

  const api = useRatingGroupContext()
  const itemState = api.getItemState({ index })
  const mergedProps = mergeProps(api.getItemProps({ index }), divProps)
  const view = runIfFn(children, itemState)

  return (
    <RatingGroupItemProvider value={itemState}>
      <ark.span {...mergedProps} ref={ref}>
        {view}
      </ark.span>
    </RatingGroupItemProvider>
  )
})

RatingGroupItem.displayName = 'RatingGroupItem'
