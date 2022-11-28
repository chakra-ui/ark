import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogDescriptionProps = HTMLArkProps<'p'>

export const DialogDescription = (props: DialogDescriptionProps) => {
  const dialog = useDialogContext()

  return <ark.p {...dialog().descriptionProps} {...props} />
}
