import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogBackdropProps = HTMLArkProps<'div'>

export const DialogBackdrop = (props: DialogBackdropProps) => {
  const dialog = useDialogContext()
  const backdropProps = mergeProps(() => dialog().backdropProps, props)
  return <ark.div {...backdropProps} />
}
