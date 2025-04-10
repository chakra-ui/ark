import type { ReactNode } from 'react'
import { type UseTagsInputContext, useTagsInputContext } from './use-tags-input-context'

export interface TagsInputContextProps {
  children: (context: UseTagsInputContext) => ReactNode
}

export const TagsInputContext = (props: TagsInputContextProps) => props.children(useTagsInputContext())
