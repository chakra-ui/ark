import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogTitleProps = HTMLArkProps<'h2'>

export const DialogTitle = (props: DialogTitleProps) => {
  const dialog = useDialogContext()
  const titleProps = mergeProps(() => dialog().titleProps, props)
  return <ark.h2 {...titleProps} />
}
