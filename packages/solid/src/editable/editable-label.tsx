import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableLabelProps = HTMLArkProps<'label'>

export const EditableLabel = (props: EditableLabelProps) => {
  const editable = useEditableContext()

  return <ark.label {...editable().labelProps} {...props} />
}
