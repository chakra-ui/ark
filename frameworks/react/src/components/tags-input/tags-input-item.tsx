import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/tags-input'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { TagsInputItemProvider } from './use-tags-input-item-context'
import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context'

export interface TagsInputItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const TagsInputItem = forwardRef<HTMLDivElement, TagsInputItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'index',
    'disabled',
    'value',
  ])
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getItemProps(itemProps), localProps)
  const tagsInputItem = tagsInput.getItemState(itemProps)

  return (
    <TagsInputItemPropsProvider value={itemProps}>
      <TagsInputItemProvider value={tagsInputItem}>
        <ark.div {...mergedProps} ref={ref} />
      </TagsInputItemProvider>
    </TagsInputItemPropsProvider>
  )
})

TagsInputItem.displayName = 'TagsInputItem'
