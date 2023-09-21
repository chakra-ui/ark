import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useTagsInputContext } from './tags-input-context'
import { TagsInputItemProvider, type ItemProps, type ItemState } from './tags-input-item-context'

export interface TagsInputItemProps
  extends ItemProps,
    Assign<
      HTMLArkProps<'div'>,
      { children?: React.ReactNode | ((props: ItemState) => React.ReactNode) }
    > {}

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
    <TagsInputItemProvider value={itemProps}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </TagsInputItemProvider>
  )
})

TagsInputItem.displayName = 'TagsInputItem'
