import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableInputProps = HTMLArkProps<'input'>

export const EditableInput = forwardRef<'input', EditableInputProps>((props, ref) => {
  const { inputProps } = useEditableContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
