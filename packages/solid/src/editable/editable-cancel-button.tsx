import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableCancelButtonProps = HTMLArkProps<'button'>

export const EditableCancelButton = (props: EditableCancelButtonProps) => {
  const editable = useEditableContext()

  return <ark.button {...editable().cancelButtonProps} {...props} />
}
