import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface DialogTitleProps
  extends JSX.HTMLAttributes<HTMLHeadingElement>,
    DialogTitleBaseProps {}

export const DialogTitle = (props: DialogTitleProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().getTitleProps(), props)

  return <ark.h2 {...mergedProps} />
}
