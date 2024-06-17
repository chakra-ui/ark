import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableEditTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface EditableEditTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    EditableEditTriggerBaseProps {}

export const EditableEditTrigger = (props: EditableEditTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getEditTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
