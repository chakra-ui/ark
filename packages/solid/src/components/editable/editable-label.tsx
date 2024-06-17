import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableLabelBaseProps extends PolymorphicProps<'label'> {}
export interface EditableLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    EditableLabelBaseProps {}

export const EditableLabel = (props: EditableLabelProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
