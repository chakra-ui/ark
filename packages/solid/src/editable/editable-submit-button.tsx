import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableSubmitButtonProps = HTMLArkProps<'button'>

export const EditableSubmitButton = (props: EditableSubmitButtonProps) => {
  const editable = useEditableContext()

  return <ark.button {...editable().submitButtonProps} {...props} />
}
