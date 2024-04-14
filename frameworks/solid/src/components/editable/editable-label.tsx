import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableLabelProps extends HTMLArkProps<'label'> {}

export const EditableLabel = (props: EditableLabelProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
