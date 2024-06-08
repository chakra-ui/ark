import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputClearTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputClearTrigger = forwardRef<HTMLButtonElement, TagsInputClearTriggerProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const mergedProps = mergeProps(tagsInput.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TagsInputClearTrigger.displayName = 'TagsInputClearTrigger'
