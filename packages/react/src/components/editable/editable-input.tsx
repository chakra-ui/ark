import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableInputBaseProps extends PolymorphicProps {}
export interface EditableInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    EditableInputBaseProps {}

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

EditableInput.displayName = 'EditableInput'
