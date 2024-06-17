import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableLabelBaseProps extends PolymorphicProps<'label'> {}
export interface EditableLabelProps extends HTMLProps<'label'>, EditableLabelBaseProps {}

export const EditableLabel = (props: EditableLabelProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
