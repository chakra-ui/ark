import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DialogCloseTriggerProps extends HTMLProps<'button'>, DialogCloseTriggerBaseProps {}

export const DialogCloseTrigger = (props: DialogCloseTriggerProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
