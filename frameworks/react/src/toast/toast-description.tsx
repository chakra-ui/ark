import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToasterItemContext } from './use-toaster-item-context'

export interface ToastDescriptionProps extends HTMLArkProps<'div'> {}

export const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>((props, ref) => {
  const toasterItem = useToasterItemContext()
  const mergedProps = mergeProps(toasterItem.descriptionProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastDescription.displayName = 'ToastDescription'
