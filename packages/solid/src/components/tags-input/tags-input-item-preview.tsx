import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemPreviewBaseProps extends PolymorphicProps<'div'> {}
export interface TagsInputItemPreviewProps
  extends HTMLProps<'div'>,
    TagsInputItemPreviewBaseProps {}

export const TagsInputItemPreview = (props: TagsInputItemPreviewProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemPreviewProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
