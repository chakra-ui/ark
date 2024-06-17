import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableSubmitTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface EditableSubmitTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    EditableSubmitTriggerBaseProps {}

export const EditableSubmitTrigger = (props: EditableSubmitTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getSubmitTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
