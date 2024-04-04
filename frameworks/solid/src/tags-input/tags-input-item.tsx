import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/tags-input'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTagsInputContext } from './use-tags-input-context'
import { TagsInputItemPropsProvider, TagsInputItemProvider } from './use-tags-input-item-context'

export interface TagsInputItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const TagsInputItem = (props: TagsInputItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'disabled',
    'index',
    'value',
  ])
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => api().getItemState(itemProps))

  return (
    <TagsInputItemPropsProvider value={itemProps}>
      <TagsInputItemProvider value={itemState}>
        <ark.div {...mergedProps()} />
      </TagsInputItemProvider>
    </TagsInputItemPropsProvider>
  )
}
