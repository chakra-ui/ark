import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastDescriptionProps extends HTMLArkProps<'div'> {}

export const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.descriptionProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastDescription.displayName = 'ToastDescription'
