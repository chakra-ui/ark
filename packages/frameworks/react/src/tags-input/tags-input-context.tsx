import { useTagsInputContext, type UseTagsInputContext } from './use-tags-input-context'

export interface TagsInputContextProps {
  children: (context: UseTagsInputContext) => React.ReactNode
}

export const TagsInputContext = (props: TagsInputContextProps) =>
  props.children(useTagsInputContext())
