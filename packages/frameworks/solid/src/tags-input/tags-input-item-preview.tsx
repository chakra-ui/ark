import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'
import { useTagsInputItemContext } from './tags-input-item-context'

export interface TagsInputItemPreviewProps extends HTMLArkProps<'div'> {}

export const TagsInputItemPreview = (props: TagsInputItemPreviewProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemContext()
  const mergedProps = mergeProps(() => api().getItemPreviewProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
