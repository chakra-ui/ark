import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export interface ToastRootProps extends HTMLArkProps<'li'> {}

export const ToastRoot = forwardRef<HTMLLIElement, ToastRootProps>((props, ref) => {
  const api = useToastContext()
  const mergedProps = mergeProps(api.rootProps, props)

  return <ark.li {...mergedProps} ref={ref} />
})

ToastRoot.displayName = 'ToastRoot'
