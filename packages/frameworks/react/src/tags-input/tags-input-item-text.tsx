import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'
import { useTagsInputItemContext } from './tags-input-item-context'

export interface TagsInputItemTextProps extends HTMLArkProps<'span'> {}

export const TagsInputItemText = forwardRef<HTMLSpanElement, TagsInputItemTextProps>(
  (props, ref) => {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemContext()
    const mergedProps = mergeProps(api.getItemTextProps(itemProps), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

TagsInputItemText.displayName = 'TagsInputItemText'
