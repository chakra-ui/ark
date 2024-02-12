import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export interface ToastGroupProps extends HTMLArkProps<'ol'> {}

export const ToastGroup = forwardRef<HTMLOListElement, ToastGroupProps>((props, ref) => {
  return <ark.ol {...props} ref={ref} />
})

ToastGroup.displayName = 'ToastGroup'
