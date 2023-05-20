import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogDescriptionProps = HTMLArkProps<'p'>

export const DialogDescription = (props: DialogDescriptionProps) => {
  const dialog = useDialogContext()
  const descriptionProps = mergeProps(() => dialog().descriptionProps, props)
  return <ark.p {...descriptionProps} />
}
