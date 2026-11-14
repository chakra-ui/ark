import type { JSX } from '@solidjs/web'
import { type UseTagsInputItemContext, useTagsInputItemContext } from './use-tags-input-item-context.ts'

export interface TagsInputItemContextProps {
  children: (context: UseTagsInputItemContext) => JSX.Element
}

export const TagsInputItemContext = (props: TagsInputItemContextProps) => props.children(useTagsInputItemContext())
