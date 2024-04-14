import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-context'

export interface TagsInputItemPreviewProps extends HTMLArkProps<'div'> {}

export const TagsInputItemPreview = (props: TagsInputItemPreviewProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemPreviewProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
