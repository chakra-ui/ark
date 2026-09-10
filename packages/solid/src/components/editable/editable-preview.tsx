import type { PreviewState } from '@zag-js/editable'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useEditableContext } from './use-editable-context.ts'

export interface EditablePreviewState extends PreviewState {}

export interface EditablePreviewBaseProps extends PolymorphicProps<'span', EditablePreviewState> {}
export interface EditablePreviewProps extends HTMLProps<'span'>, EditablePreviewBaseProps {}

export const EditablePreview = (props: EditablePreviewProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getPreviewProps(), props)

  return <ark.span {...mergedProps} state={api().getPreviewState()} />
}
