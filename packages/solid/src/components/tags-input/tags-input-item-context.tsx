import type { JSX } from 'solid-js'
import {
  type UseTagsInputItemContext,
  useTagsInputItemContext,
} from './use-tags-input-item-context'

export interface TagsInputItemContextProps {
  children: (context: UseTagsInputItemContext) => JSX.Element
}

export const TagsInputItemContext = (props: TagsInputItemContextProps) =>
  props.children(useTagsInputItemContext())
