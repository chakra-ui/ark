import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogCloseTriggerProps = HTMLArkProps<'button'>

export const DialogCloseTrigger = (props: DialogCloseTriggerProps) => {
  const dialog = useDialogContext()
  const triggerProps = mergeProps(() => dialog().triggerProps, props)
  return <ark.button {...triggerProps} />
}
