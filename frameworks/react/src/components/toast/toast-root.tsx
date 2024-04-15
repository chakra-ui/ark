import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { HTMLArkProps } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends HTMLArkProps<'div'> {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.rootProps, props)

  return (
    <div {...mergedProps} ref={ref}>
      <div {...toast.ghostBeforeProps} />
      {props.children}
      <div {...toast.ghostAfterProps} />
    </div>
  )
})

ToastRoot.displayName = 'ToastRoot'
