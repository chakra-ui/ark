import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export interface ToastTitleProps extends HTMLArkProps<'h3'> {}

export const ToastTitle = forwardRef<HTMLHeadingElement, ToastTitleProps>((props, ref) => {
  const api = useToastItemContext()
  const mergedProps = mergeProps(api.titleProps, props)

  return (
    <ark.h3 {...mergedProps} ref={ref}>
      {api.title}
    </ark.h3>
  )
})

ToastTitle.displayName = 'ToastTitle'
