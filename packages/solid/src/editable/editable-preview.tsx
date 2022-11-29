import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HTMLArkProps<'span'>

export const EditablePreview = (props: EditablePreviewProps) => {
  const editable = useEditableContext()

  return <ark.span {...editable().previewProps} {...props} />
}
