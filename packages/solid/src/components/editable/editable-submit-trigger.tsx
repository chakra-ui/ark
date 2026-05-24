import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableSubmitTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface EditableSubmitTriggerProps extends HTMLProps<'button'>, EditableSubmitTriggerBaseProps {}

export const EditableSubmitTrigger = (props: EditableSubmitTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getSubmitTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
