import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableEditTriggerProps extends HTMLArkProps<'button'> {}

export const EditableEditTrigger = (props: EditableEditTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().editTriggerProps, props)

  return <ark.button {...mergedProps} />
}
