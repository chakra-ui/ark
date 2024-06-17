import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemPreviewBaseProps extends PolymorphicProps<'div'> {}
export interface TagsInputItemPreviewProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    TagsInputItemPreviewBaseProps {}

export const TagsInputItemPreview = (props: TagsInputItemPreviewProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemPreviewProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
