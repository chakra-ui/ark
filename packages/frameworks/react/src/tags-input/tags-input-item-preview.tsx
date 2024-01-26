import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'
import { useTagsInputItemContext } from './tags-input-item-context'

export interface TagsInputItemPreviewProps extends HTMLArkProps<'div'> {}

export const TagsInputItemPreview = forwardRef<HTMLDivElement, TagsInputItemPreviewProps>(
  (props, ref) => {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemContext()
    const mergedProps = mergeProps(api.getItemPreviewProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TagsInputItemPreview.displayName = 'TagsInputItemPreview'
