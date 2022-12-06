import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastTitleProps = HTMLArkProps<'h3'>

export const ToastTitle = forwardRef<'h3', ToastTitleProps>((props, ref) => {
  const { titleProps, title } = useToastItemContext()
  const mergedProps = mergeProps(titleProps, props)

  return (
    <ark.h3 {...mergedProps} ref={ref}>
      {title}
    </ark.h3>
  )
})
