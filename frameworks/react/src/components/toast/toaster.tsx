import { mergeProps, normalizeProps, useActor, useMachine } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { type ReactNode, forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import type { createToaster } from './create-toaster'
import { ToastProvider } from './use-toast-context'

export interface ToastProps
  extends Assign<
    HTMLArkProps<'div'>,
    {
      // TODO simplify
      toaster: ReturnType<typeof createToaster>
      children: (toast: toast.Options<any>) => ReactNode
    }
  > {}

const ToastActor = (props: {
  value: toast.Service
  children: (ctx: toast.Options<any>) => ReactNode
}) => {
  const [state, send] = useActor(props.value)
  const api = toast.connect(state, send, normalizeProps)
  return <ToastProvider value={api}>{props.children(state.context)}</ToastProvider>
}

export const Toaster = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const { toaster, children, ...rest } = props
  const [state, send] = useMachine(toaster.machine)
  const placement = state.context.placement

  const api = toast.group.connect(state, send, normalizeProps)
  const toastsByPlacement = api.getToastsByPlacement()
  const toasts = toastsByPlacement[state.context.placement] ?? []

  const mergedProps = mergeProps(api.getGroupProps({ placement }), rest)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {toasts.map((toast) => (
        <ToastActor key={toast.id} value={toast}>
          {(ctx) => children(ctx)}
        </ToastActor>
      ))}
    </ark.div>
  )
})

Toaster.displayName = 'Toaster'
