import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogTitleProps extends HTMLArkProps<'h2'> {}

export const DialogTitle: ArkComponent<'h2'> = (props: DialogTitleProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().titleProps, props)

  return <ark.h2 {...mergedProps} />
}
