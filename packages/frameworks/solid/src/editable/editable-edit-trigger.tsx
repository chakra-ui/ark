import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableEditTriggerProps extends HTMLArkProps<'button'> {}

export const EditableEditTrigger = (props: EditableEditTriggerProps) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(() => editable().editTriggerProps, props)

  return <ark.button {...mergedProps} />
}
