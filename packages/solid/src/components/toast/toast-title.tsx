import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastTitleProps extends HTMLArkProps<'div'> {}

export const ToastTitle = (props: ToastTitleProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getTitleProps(), props)

  return <ark.div {...mergedProps} />
}
