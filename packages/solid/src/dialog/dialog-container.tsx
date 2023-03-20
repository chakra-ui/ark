import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContainerProps = HTMLArkProps<'div'>

export const DialogContainer = (props: DialogContainerProps) => {
  const dialog = useDialogContext()

  return <ark.div {...dialog().containerProps} {...props} />
}
