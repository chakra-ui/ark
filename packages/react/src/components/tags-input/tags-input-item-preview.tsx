import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemPreviewBaseProps extends PolymorphicProps {}
export interface TagsInputItemPreviewProps
  extends HTMLAttributes<HTMLDivElement>,
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
