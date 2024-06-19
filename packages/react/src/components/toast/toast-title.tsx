import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastTitleBaseProps extends PolymorphicProps {}
export interface ToastTitleProps extends HTMLProps<'div'>, ToastTitleBaseProps {}

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getTitleProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastTitle.displayName = 'ToastTitle'
