import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useEditableContext } from './editable-context'

export type EditableInputProps = HTMLAtlasProps<'input'>

export const EditableInput = forwardRef<'input'>((props, ref) => {
  const { inputProps } = useEditableContext()
  return <atlas.input {...props} {...inputProps} ref={ref} />
})
