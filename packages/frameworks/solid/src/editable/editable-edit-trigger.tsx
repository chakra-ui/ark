import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableEditTriggerProps extends HTMLArkProps<'button'> {}

export const EditableEditTrigger: ArkComponent<'button'> = (props) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().editTriggerProps, props)

  return <ark.button {...mergedProps} />
}
