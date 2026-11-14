import type { JSX } from '@solidjs/web'
import { type UseTagsInputContext, useTagsInputContext } from './use-tags-input-context.ts'

export interface TagsInputContextProps {
  children: (context: UseTagsInputContext) => JSX.Element
}

export const TagsInputContext = (props: TagsInputContextProps) => props.children(useTagsInputContext())
