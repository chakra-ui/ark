import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>((props, ref) => {
  const { inputProps } = useEditableContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

EditableInput.displayName = 'EditableInput'
