import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputInputProps extends HTMLArkProps<'input'> {}

export const TagsInputInput = forwardRef<HTMLInputElement, TagsInputInputProps>((props, ref) => {
  const { inputProps } = useTagsInputContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

TagsInputInput.displayName = 'TagsInputInput'
