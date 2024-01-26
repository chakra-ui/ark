import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditablePreviewProps extends HTMLArkProps<'span'> {}

export const EditablePreview: ArkComponent<'span'> = (props) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().previewProps, props)

  return <ark.span {...mergedProps} />
}
