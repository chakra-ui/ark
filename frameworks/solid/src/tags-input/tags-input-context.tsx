import type { JSX } from 'solid-js'
import { useTagsInputContext, type UseTagsInputContext } from './use-tags-input-context'

export interface TagsInputContextProps {
  children: (context: UseTagsInputContext) => JSX.Element
}

export const TagsInputContext = (props: TagsInputContextProps) =>
  props.children(useTagsInputContext())
