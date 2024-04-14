import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'

export interface ToastGroupProps extends HTMLArkProps<'ol'> {}

export const ToastGroup = forwardRef<HTMLOListElement, ToastGroupProps>((props, ref) => {
  return <ark.ol {...props} ref={ref} />
})

ToastGroup.displayName = 'ToastGroup'
