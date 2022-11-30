import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogBackdropProps = HTMLArkProps<'div'>

export const DialogBackdrop = (props: DialogBackdropProps) => {
  const dialog = useDialogContext()

  return <ark.div {...dialog().backdropProps} {...props} />
}
