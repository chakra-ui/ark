import { mergeProps } from '@zag-js/react'
import type { ItemProps, ItemState } from '@zag-js/tags-input'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputItemProps
  extends Assign<HTMLArkProps<'div'>, { children?: ReactNode | ((state: ItemState) => ReactNode) }>,
    ItemProps {}

export const TagsInputItem = forwardRef<HTMLDivElement, TagsInputItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, [
    'index',
    'disabled',
    'value',
  ])

  const api = useTagsInputContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {view}
    </ark.div>
  )
})

TagsInputItem.displayName = 'TagsInputItem'
