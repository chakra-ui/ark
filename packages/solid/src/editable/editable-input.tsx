import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableInputProps = HTMLArkProps<'input'>

export const EditableInput = (props: EditableInputProps) => {
  const editable = useEditableContext()

  return <ark.input {...editable().inputProps} {...props} />
}
