import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-context'

export interface TagsInputItemTextProps extends HTMLArkProps<'span'> {}

export const TagsInputItemText = forwardRef<HTMLSpanElement, TagsInputItemTextProps>(
  (props, ref) => {
    const context = useTagsInputContext()
    const itemProps = useTagsInputItemPropsContext()
    const mergedProps = mergeProps(context.getItemTextProps(itemProps), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

TagsInputItemText.displayName = 'TagsInputItemText'
