'use client'

import { mergeProps } from '@zag-js/react'
import type { ItemProps, ItemState } from '@zag-js/tags-input'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { TagsInputItemProvider } from './use-tags-input-item-context.ts'
import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context.ts'

export interface TagsInputItemState extends ItemState {}

export interface TagsInputItemBaseProps extends ItemProps, PolymorphicProps<TagsInputItemState> {}
export interface TagsInputItemProps extends HTMLProps<'div'>, TagsInputItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const TagsInputItem = forwardRef<HTMLDivElement, TagsInputItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['index', 'disabled', 'value'])
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getItemProps(itemProps), localProps)
  const tagsInputItem = tagsInput.getItemState(itemProps)

  return (
    <TagsInputItemPropsProvider value={itemProps}>
      <TagsInputItemProvider value={tagsInputItem}>
        <ark.div {...mergedProps} ref={ref} state={tagsInput.getItemState(itemProps)} />
      </TagsInputItemProvider>
    </TagsInputItemPropsProvider>
  )
})

TagsInputItem.displayName = 'TagsInputItem'
