import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = HTMLArkProps<'div'>

export const DialogContent = (props: DialogContentProps) => {
  const dialog = useDialogContext()

  return <ark.div {...dialog().contentProps} {...props} />
}
