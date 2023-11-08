import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableCancelTriggerProps extends HTMLArkProps<'button'> {}

export const EditableCancelTrigger = (props: EditableCancelTriggerProps) => {
  const editable = useEditableContext()
  const triggerProps = mergeProps(() => editable().cancelTriggerProps, props)
  return <ark.button {...triggerProps} />
}
