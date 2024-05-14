import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputHiddenInputProps extends HTMLArkProps<'input'> {}

export const TagsInputHiddenInput = forwardRef<HTMLInputElement, TagsInputHiddenInputProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const mergedProps = mergeProps(tagsInput.hiddenInputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

TagsInputHiddenInput.displayName = 'TagsInputHiddenInput'
