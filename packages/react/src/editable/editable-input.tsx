import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableInputProps = HtmlArkProps<'input'>

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>((props, ref) => {
  const { inputProps } = useEditableContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

EditableInput.displayName = 'EditableInput'
