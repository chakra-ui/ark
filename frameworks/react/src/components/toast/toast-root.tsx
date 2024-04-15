import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends HTMLArkProps<'div'> {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.rootProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastRoot.displayName = 'ToastRoot'
