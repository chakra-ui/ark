import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableInputProps = HTMLAtlasProps<'input'>

export const EditableInput = forwardRef<'input', EditableInputProps>((props, ref) => {
  const { inputProps } = useEditableContext()
  return <atlas.input {...props} {...inputProps} ref={ref} />
})
