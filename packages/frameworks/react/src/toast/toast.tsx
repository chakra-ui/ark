import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './toast-context'

export interface ToastProps extends HTMLArkProps<'li'> {}

export const Toast = forwardRef<HTMLLIElement, ToastProps>((props, ref) => {
  const api = useToastContext()
  const mergedProps = mergeProps(api.rootProps, props)

  return <ark.li {...mergedProps} ref={ref} />
})

Toast.displayName = 'Toast'
