import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = HTMLArkProps<'div'>

export const DialogContent = (props: DialogContentProps) => {
  const dialog = useDialogContext()
  const contentProps = mergeProps(() => dialog().contentProps, props)
  return <ark.div {...contentProps} />
}
