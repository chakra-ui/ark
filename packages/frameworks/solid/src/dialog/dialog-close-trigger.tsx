import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogCloseTriggerProps extends HTMLArkProps<'button'> {}

export const DialogCloseTrigger = (props: DialogCloseTriggerProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().closeTriggerProps, props)

  return <ark.button {...mergedProps} />
}
