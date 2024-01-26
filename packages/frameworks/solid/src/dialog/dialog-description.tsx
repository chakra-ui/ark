import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogDescriptionProps extends HTMLArkProps<'p'> {}

export const DialogDescription: ArkComponent<'p'> = (props) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().descriptionProps, props)

  return <ark.p {...mergedProps} />
}
