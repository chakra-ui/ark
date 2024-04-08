import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastTitleProps extends HTMLArkProps<'div'> {}

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.titleProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastTitle.displayName = 'ToastTitle'
