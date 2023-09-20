import { mergeProps } from '@zag-js/solid'
import { useTagsInputItemContext } from '.'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputItemTextProps = HTMLArkProps<'span'>

export const TagsInputItemText = (props: TagsInputItemTextProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
