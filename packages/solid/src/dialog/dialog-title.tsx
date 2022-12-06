import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogTitleProps = HTMLArkProps<'h2'>

export const DialogTitle = (props: DialogTitleProps) => {
  const dialog = useDialogContext()

  return <ark.h2 {...dialog().titleProps} {...props} />
}
