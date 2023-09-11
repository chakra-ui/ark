import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputInputProps = HtmlArkProps<'input'>

export const TagsInputInput = forwardRef<HTMLInputElement, TagsInputInputProps>((props, ref) => {
  const { inputProps } = useTagsInputContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

TagsInputInput.displayName = 'TagsInputInput'
