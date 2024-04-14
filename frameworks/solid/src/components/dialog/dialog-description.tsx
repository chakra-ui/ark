import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useDialogContext } from './use-dialog-context'

export interface DialogDescriptionProps extends HTMLArkProps<'div'> {}

export const DialogDescription = (props: DialogDescriptionProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().descriptionProps, props)

  return <ark.div {...mergedProps} />
}
