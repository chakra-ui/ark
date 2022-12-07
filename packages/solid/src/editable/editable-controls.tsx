import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableControlsProps = HTMLArkProps<'div'>

export const EditableControls = (props: EditableControlsProps) => {
  const editable = useEditableContext()

  return <ark.div {...editable().controlGroupProps} {...props} />
}
