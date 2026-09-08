'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useToastContext } from './use-toast-context.ts'
import type { RootState } from '@zag-js/toast'

export interface ToastRootState extends RootState {}

export interface ToastRootBaseProps extends PolymorphicProps<ToastRootState> {}
export interface ToastRootProps extends HTMLProps<'div'>, ToastRootBaseProps {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getRootProps(), props)

  return (
    <ark.div {...mergedProps} ref={ref} state={toast.getRootState()}>
      <div {...toast.getGhostBeforeProps()} />
      {props.children}
      <div {...toast.getGhostAfterProps()} />
    </ark.div>
  )
})

ToastRoot.displayName = 'ToastRoot'
