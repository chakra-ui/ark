import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/tags-input'
import { type JSX, createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { TagsInputItemProvider } from './use-tags-input-item-context'
import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context'

export interface TagsInputItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface TagsInputItemProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    TagsInputItemBaseProps {}

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
        <ark.div {...mergedProps} />
      </TagsInputItemProvider>
    </TagsInputItemPropsProvider>
  )
}
