import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootBaseProps extends PolymorphicProps {}
export interface ToastRootProps extends HTMLProps<'div'>, ToastRootBaseProps {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getRootProps(), props)

  return (
    <div {...mergedProps} ref={ref}>
      <div {...toast.getGhostBeforeProps()} />
      {props.children}
      <div {...toast.getGhostAfterProps()} />
    </div>
  )
})

ToastRoot.displayName = 'ToastRoot'
