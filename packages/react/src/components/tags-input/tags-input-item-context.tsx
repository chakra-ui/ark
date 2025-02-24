import type { ReactNode } from 'react'
import { type UseTagsInputItemContext, useTagsInputItemContext } from './use-tags-input-item-context'

export interface TagsInputItemContextProps {
  children: (context: UseTagsInputItemContext) => ReactNode
}

export const TagsInputItemContext = (props: TagsInputItemContextProps) => props.children(useTagsInputItemContext())
