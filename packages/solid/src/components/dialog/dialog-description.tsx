import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface DialogDescriptionProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    DialogDescriptionBaseProps {}

export const DialogDescription = (props: DialogDescriptionProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().getDescriptionProps(), props)

  return <ark.div {...mergedProps} />
}
