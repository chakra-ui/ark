import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export type EditableInputBaseProps = {}
export interface EditableInputProps extends HTMLArkProps<'input'>, EditableInputBaseProps {}

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

EditableInput.displayName = 'EditableInput'
