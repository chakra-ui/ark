import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputClearTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputClearTrigger = forwardRef<HTMLButtonElement, TagsInputClearTriggerProps>(
  (props, ref) => {
    const api = useTagsInputContext()
    const mergedProps = mergeProps(api.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TagsInputClearTrigger.displayName = 'TagsInputClearTrigger'
