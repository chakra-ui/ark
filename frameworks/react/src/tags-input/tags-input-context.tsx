import type { ReactNode } from 'react'
import { useTagsInputContext, type UseTagsInputContext } from './use-tags-input-context'

export interface TagsInputContextProps {
  children: (context: UseTagsInputContext) => ReactNode
}

export const TagsInputContext = (props: TagsInputContextProps) =>
  props.children(useTagsInputContext())
