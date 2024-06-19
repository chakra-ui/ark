import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableEditTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface EditableEditTriggerProps
  extends HTMLProps<'button'>,
    EditableEditTriggerBaseProps {}

export const EditableEditTrigger = (props: EditableEditTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getEditTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
