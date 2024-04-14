import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends HTMLArkProps<'li'> {}

export const ToastRoot = forwardRef<HTMLLIElement, ToastRootProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.rootProps, props)

  return <ark.li {...mergedProps} ref={ref} />
})

ToastRoot.displayName = 'ToastRoot'
