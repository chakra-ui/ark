import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputInputProps extends HTMLArkProps<'input'> {}

export const TagsInputInput = forwardRef<HTMLInputElement, TagsInputInputProps>((props, ref) => {
  const context = useTagsInputContext()
  const mergedProps = mergeProps(context.inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

TagsInputInput.displayName = 'TagsInputInput'
