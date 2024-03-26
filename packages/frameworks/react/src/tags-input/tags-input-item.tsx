import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/tags-input'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useTagsInputContext } from './use-tags-input-context'
import { TagsInputItemPropsProvider, TagsInputItemProvider } from './use-tags-input-item-context'

export interface TagsInputItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const TagsInputItem = forwardRef<HTMLDivElement, TagsInputItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'index',
    'disabled',
    'value',
  ])
  const context = useTagsInputContext()
  const mergedProps = mergeProps(context.getItemProps(itemProps), localProps)
  const itemState = context.getItemState(itemProps)

  return (
    <TagsInputItemPropsProvider value={itemProps}>
      <TagsInputItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </TagsInputItemProvider>
    </TagsInputItemPropsProvider>
  )
})

TagsInputItem.displayName = 'TagsInputItem'
