import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputClearTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputClearTrigger = forwardRef<HTMLButtonElement, TagsInputClearTriggerProps>(
  (props, ref) => {
    const context = useTagsInputContext()
    const mergedProps = mergeProps(context.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TagsInputClearTrigger.displayName = 'TagsInputClearTrigger'
