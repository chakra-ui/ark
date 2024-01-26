import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'
import { useTagsInputItemContext } from './tags-input-item-context'

export interface TagsInputItemTextProps extends HTMLArkProps<'span'> {}

export const TagsInputItemText: ArkComponent<'span'> = (props: TagsInputItemTextProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
