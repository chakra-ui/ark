import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableInputProps extends HTMLArkProps<'input'> {}

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>((props, ref) => {
  const context = useEditableContext()
  const mergedProps = mergeProps(context.inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

EditableInput.displayName = 'EditableInput'
