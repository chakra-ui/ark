import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableCancelTriggerProps extends HTMLArkProps<'button'> {}

export const EditableCancelTrigger = (props: EditableCancelTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().cancelTriggerProps, props)

  return <ark.button {...mergedProps()} />
}
