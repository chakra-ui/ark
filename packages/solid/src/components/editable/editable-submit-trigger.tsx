import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableSubmitTriggerProps extends HTMLArkProps<'button'> {}

export const EditableSubmitTrigger = (props: EditableSubmitTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getSubmitTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
