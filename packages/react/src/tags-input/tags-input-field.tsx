import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputFieldProps = ComponentPropsWithoutRef<typeof ark.input>

export const TagsInputField = forwardRef<HTMLInputElement, TagsInputFieldProps>((props, ref) => {
  const { inputProps } = useTagsInputContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

TagsInputField.displayName = 'TagsInputField'
