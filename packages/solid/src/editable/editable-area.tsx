import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = HTMLArkProps<'div'>

export const EditableArea = (props: EditableAreaProps) => {
  const editable = useEditableContext()

  return <ark.div {...editable().areaProps} {...props} />
}
