'use client'

import { mergeProps } from '@zag-js/react'
import { type ReactNode, cloneElement, forwardRef, isValidElement } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useToastContext } from './use-toast-context.ts'
import type { RootState } from '@zag-js/toast'

export interface ToastRootState extends RootState {}

export interface ToastRootBaseProps extends PolymorphicProps<ToastRootState> {}
export interface ToastRootProps extends HTMLProps<'div'>, ToastRootBaseProps {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>((props, ref) => {
  const { asChild, children, ...localProps } = props
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getRootProps(), localProps)

  const withGhosts = (content: ReactNode) => (
    <>
      <div {...toast.getGhostBeforeProps()} />
      {content}
      <div {...toast.getGhostAfterProps()} />
    </>
  )

  const asChildContent = () => {
    if (!isValidElement<{ children?: ReactNode }>(children)) return children
    return cloneElement(children, undefined, withGhosts(children.props.children))
  }

  return (
    <ark.div {...mergedProps} asChild={asChild} ref={ref} state={toast.getRootState()}>
      {asChild ? asChildContent() : withGhosts(children)}
    </ark.div>
  )
})

ToastRoot.displayName = 'ToastRoot'
