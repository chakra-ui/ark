import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContainerProps = HTMLArkProps<'div'>

export const DialogContainer = (props: DialogContainerProps) => {
  const dialog = useDialogContext()
  const containerProps = mergeProps(() => dialog().containerProps, props)
  return <ark.div {...containerProps} />
}
