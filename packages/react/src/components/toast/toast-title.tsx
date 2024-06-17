import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastTitleBaseProps extends PolymorphicProps {}
export interface ToastTitleProps extends HTMLAttributes<HTMLDivElement>, ToastTitleBaseProps {}

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getTitleProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastTitle.displayName = 'ToastTitle'
