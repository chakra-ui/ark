import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDialogContext } from './use-dialog-context.ts'

export interface DialogDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface DialogDescriptionProps extends HTMLProps<'div'>, DialogDescriptionBaseProps {}

export const DialogDescription = (props: DialogDescriptionProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().getDescriptionProps(), props)

  return <ark.div {...mergedProps} />
}
