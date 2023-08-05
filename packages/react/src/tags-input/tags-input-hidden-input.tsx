import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputHiddenInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const TagsInputHiddenInput = forwardRef<HTMLInputElement, TagsInputHiddenInputProps>(
  (props, ref) => {
    const { hiddenInputProps } = useTagsInputContext()
    const mergedProps = mergeProps(hiddenInputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

TagsInputHiddenInput.displayName = 'TagsInputHiddenInput'
