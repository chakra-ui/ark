import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemContext } from './use-tags-input-item-context'

export interface TagsInputItemPreviewProps extends HTMLArkProps<'div'> {}

export const TagsInputItemPreview = forwardRef<HTMLDivElement, TagsInputItemPreviewProps>(
  (props, ref) => {
    const context = useTagsInputContext()
    const itemContext = useTagsInputItemContext()
    const mergedProps = mergeProps(context.getItemPreviewProps(itemContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TagsInputItemPreview.displayName = 'TagsInputItemPreview'
