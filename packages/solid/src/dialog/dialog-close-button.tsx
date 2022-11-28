import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogCloseButtonProps = HTMLArkProps<'button'>

export const DialogCloseButton = (props: DialogCloseButtonProps) => {
  const dialog = useDialogContext()

  return <ark.button {...dialog().closeButtonProps} {...props} />
}
