import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditablePreviewProps extends HTMLArkProps<'span'> {}

export const EditablePreview = (props: EditablePreviewProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getPreviewProps(), props)

  return <ark.span {...mergedProps} />
}
