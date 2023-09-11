import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputClearTriggerProps = HtmlArkProps<'button'>

export const TagsInputClearTrigger = forwardRef<HTMLButtonElement, TagsInputClearTriggerProps>(
  (props, ref) => {
    const { clearTriggerProps } = useTagsInputContext()
    const mergedProps = mergeProps(clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TagsInputClearTrigger.displayName = 'TagsInputClearTrigger'
