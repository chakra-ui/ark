import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useEditableContext } from './use-editable-context.ts'
import type { LabelState } from '@zag-js/editable'

export interface EditableLabelState extends LabelState {}

export interface EditableLabelBaseProps extends PolymorphicProps<'label', EditableLabelState> {}
export interface EditableLabelProps extends HTMLProps<'label'>, EditableLabelBaseProps {}

export const EditableLabel = (props: EditableLabelProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} state={api().getLabelState()} />
}
