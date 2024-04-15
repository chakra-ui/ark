import { mergeProps } from '@zag-js/solid'
import type { HTMLArkProps } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends HTMLArkProps<'div'> {}

export const ToastRoot = (props: ToastRootProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast().rootProps, props)

  return <div {...mergedProps} />
}
