import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableLabelProps extends HTMLArkProps<'label'> {}

export const EditableLabel = (props: EditableLabelProps) => {
  const editable = useEditableContext()
  const labelProps = mergeProps(() => editable().labelProps, props)
  return <ark.label {...labelProps} />
}
