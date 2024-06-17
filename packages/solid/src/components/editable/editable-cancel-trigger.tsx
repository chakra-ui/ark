import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableCancelTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface EditableCancelTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    EditableCancelTriggerBaseProps {}

export const EditableCancelTrigger = (props: EditableCancelTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getCancelTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
