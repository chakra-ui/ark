import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableSubmitTriggerProps extends HTMLArkProps<'button'> {}

export const EditableSubmitTrigger = (props: EditableSubmitTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().submitTriggerProps, props)

  return <ark.button {...mergedProps} />
}
