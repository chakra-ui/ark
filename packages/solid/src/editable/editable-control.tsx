import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableControlProps = HTMLArkProps<'div'>

export const EditableControl = (props: EditableControlProps) => {
  const editable = useEditableContext()

  return <ark.div {...editable().controlProps} {...props} />
}
