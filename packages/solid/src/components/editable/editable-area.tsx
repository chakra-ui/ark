import type { AreaState } from '@zag-js/editable'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableAreaState extends AreaState {}

export interface EditableAreaBaseProps extends PolymorphicProps<'div', EditableAreaState> {}
export interface EditableAreaProps extends HTMLProps<'div'>, EditableAreaBaseProps {}

export const EditableArea = (props: EditableAreaProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getAreaProps(), props)

  return <ark.div {...mergedProps} state={api().getAreaState()} />
}
