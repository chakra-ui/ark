import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseButtonProps = HTMLArkProps<'button'>

export const ToastCloseButton = forwardRef<'button', ToastCloseButtonProps>((props, ref) => {
  const { closeButtonProps } = useToastItemContext()
  const mergedProps = mergeProps(closeButtonProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
