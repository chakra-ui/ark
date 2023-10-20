import { mergeProps } from '@zag-js/solid'
import type { ItemProps, ItemState } from '@zag-js/tags-input'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useTagsInputContext } from './tags-input-context'
import { TagsInputItemProvider } from './tags-input-item-context'

export type TagsInputItemProps = Assign<
  HTMLArkProps<'div'>,
  ItemProps & {
    children?: JSX.Element | ((state: () => ItemState) => JSX.Element)
  }
>

export const TagsInputItem = (props: TagsInputItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'disabled',
    'index',
    'value',
  ])
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getItemState(itemProps))

  return (
    <TagsInputItemProvider value={itemProps}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </TagsInputItemProvider>
  )
}
