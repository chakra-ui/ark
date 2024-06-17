import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableAreaBaseProps extends PolymorphicProps<'div'> {}
export interface EditableAreaProps extends HTMLProps<'div'>, EditableAreaBaseProps {}

export const EditableArea = (props: EditableAreaProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getAreaProps(), props)

  return <ark.div {...mergedProps} />
}
