import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface DialogTitleProps extends HTMLProps<'h2'>, DialogTitleBaseProps {}

export const DialogTitle = (props: DialogTitleProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().getTitleProps(), props)

  return <ark.h2 {...mergedProps} />
}
