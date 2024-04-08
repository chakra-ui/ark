import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToasterItemContext } from './use-toaster-item-context'

export interface ToastTitleProps extends HTMLArkProps<'div'> {}

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>((props, ref) => {
  const toasterItem = useToasterItemContext()
  const mergedProps = mergeProps(toasterItem.titleProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastTitle.displayName = 'ToastTitle'
