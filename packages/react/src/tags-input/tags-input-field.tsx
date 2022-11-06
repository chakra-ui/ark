import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputFieldProps = HTMLArkProps<'input'>

export const TagsInputField = forwardRef<'input', TagsInputFieldProps>((props, ref) => {
  const { inputProps } = useTagsInputContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
