import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastTitleProps = HTMLArkProps<'h3'>

export const ToastTitle = forwardRef<HTMLHeadingElement, ToastTitleProps>((props, ref) => {
  const { titleProps, title } = useToastItemContext()
  const mergedProps = mergeProps(titleProps, props)

  return (
    <ark.h3 {...mergedProps} ref={ref}>
      {title}
    </ark.h3>
  )
})

ToastTitle.displayName = 'ToastTitle'
