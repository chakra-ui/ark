import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HTMLArkProps<'span'>

export const EditablePreview = (props: EditablePreviewProps) => {
  const editable = useEditableContext()
  const previewProps = mergeProps(() => editable().previewProps, props)
  return <ark.span {...previewProps} />
}
