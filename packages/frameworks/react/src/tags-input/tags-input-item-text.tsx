import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemContext } from './use-tags-input-item-context'

export interface TagsInputItemTextProps extends HTMLArkProps<'span'> {}

export const TagsInputItemText = forwardRef<HTMLSpanElement, TagsInputItemTextProps>(
  (props, ref) => {
    const context = useTagsInputContext()
    const itemContext = useTagsInputItemContext()
    const mergedProps = mergeProps(context.getItemTextProps(itemContext), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

TagsInputItemText.displayName = 'TagsInputItemText'
