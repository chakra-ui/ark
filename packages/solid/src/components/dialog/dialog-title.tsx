import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogTitleProps extends HTMLArkProps<'h2'> {}

export const DialogTitle = (props: DialogTitleProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().getTitleProps(), props)

  return <ark.h2 {...mergedProps} />
}
