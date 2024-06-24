import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useEditableContext } from './use-editable-context'

export interface EditableInputBaseProps extends PolymorphicProps {}
export interface EditableInputProps extends HTMLProps<'input'>, EditableInputBaseProps {}

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

EditableInput.displayName = 'EditableInput'
