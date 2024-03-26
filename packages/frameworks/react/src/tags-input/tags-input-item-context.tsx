import {
  useTagsInputItemContext,
  type UseTagsInputItemContext,
} from './use-tags-input-item-context'

export interface TagsInputItemContextProps {
  children: (context: Omit<UseTagsInputItemContext, 'disabled' | 'index'>) => React.ReactNode
}

export const TagsInputItemContext = (props: TagsInputItemContextProps) =>
  props.children(useTagsInputItemContext())
