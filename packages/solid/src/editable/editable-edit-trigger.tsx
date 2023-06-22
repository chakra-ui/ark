import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableEditTriggerProps = HTMLArkProps<'button'>

export const EditableEditTrigger = (props: EditableEditTriggerProps) => {
  const editable = useEditableContext()
  const triggerProps = mergeProps(() => editable().editTriggerProps, props)
  return <ark.button {...triggerProps} />
}
