import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableEditButtonProps = HTMLArkProps<'button'>

export const EditableEditButton = (props: EditableEditButtonProps) => {
  const editable = useEditableContext()

  return <ark.button {...editable().editButtonProps} {...props} />
}
