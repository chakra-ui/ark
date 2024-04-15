import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastDescriptionProps extends HTMLArkProps<'div'> {}

export const ToastDescription = (props: ToastDescriptionProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().descriptionProps, props)

  return <ark.div {...mergedProps} />
}
