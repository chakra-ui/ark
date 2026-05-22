'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastDescriptionBaseProps extends PolymorphicProps {}
export interface ToastDescriptionProps extends HTMLProps<'div'>, ToastDescriptionBaseProps {}

export const ToastDescription = ({ ref, ...props }: ToastDescriptionProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getDescriptionProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

ToastDescription.displayName = 'ToastDescription'
