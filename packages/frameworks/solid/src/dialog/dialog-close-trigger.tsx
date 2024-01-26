import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogCloseTriggerProps extends HTMLArkProps<'button'> {}

export const DialogCloseTrigger: ArkComponent<'button'> = (props) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().closeTriggerProps, props)

  return <ark.button {...mergedProps} />
}
