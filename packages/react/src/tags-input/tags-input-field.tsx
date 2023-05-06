import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputFieldProps = HTMLArkProps<'input'>

export const TagsInputField = forwardRef<'input', TagsInputFieldProps>((props, ref) => {
  const { inputProps } = useTagsInputContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
