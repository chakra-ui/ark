'use client'

import { mergeProps } from '@zag-js/react'
import { type ReactNode, cloneElement, forwardRef, isValidElement } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useToastContext } from './use-toast-context.ts'

export interface ToastRootBaseProps extends PolymorphicProps {}
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

  // The ghosts belong to the root, so asChild has to nest them inside the child it renders as.
  const asChildContent = () => {
    if (!isValidElement<{ children?: ReactNode }>(children)) return children
    return cloneElement(children, undefined, withGhosts(children.props.children))
  }

  return (
    <ark.div {...mergedProps} asChild={asChild} ref={ref}>
      {asChild ? asChildContent() : withGhosts(children)}
    </ark.div>
  )
})

ToastRoot.displayName = 'ToastRoot'
