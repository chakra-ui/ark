import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemPreviewBaseProps extends PolymorphicProps {}
export interface TagsInputItemPreviewProps
  extends HTMLProps<'div'>,
    TagsInputItemPreviewBaseProps {}

export const TagsInputItemPreview = forwardRef<HTMLDivElement, TagsInputItemPreviewProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const itemProps = useTagsInputItemPropsContext()
    const mergedProps = mergeProps(tagsInput.getItemPreviewProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TagsInputItemPreview.displayName = 'TagsInputItemPreview'
