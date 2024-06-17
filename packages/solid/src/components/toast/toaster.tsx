import { mergeProps, normalizeProps, useActor, useMachine } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { type Accessor, For, type JSX, createMemo, splitProps } from 'solid-js'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { CreateToasterReturn } from './create-toaster'
import { ToastProvider } from './use-toast-context'

export interface ToasterBaseProps extends PolymorphicProps<'div'> {
  toaster: CreateToasterReturn
  children: (toast: Accessor<toast.Options<JSX.Element>>) => JSX.Element
}
export interface ToasterProps extends Assign<HTMLProps<'div'>, ToasterBaseProps> {}

export const Toaster = (props: ToasterProps) => {
  const [toasterProps, localProps] = splitProps(props, ['toaster', 'children'])
  const [state, send] = useMachine(toasterProps.toaster.machine)
  const placement = state.context.placement

  const api = createMemo(() => toast.group.connect(state, send, normalizeProps))
  const toasts = createMemo(() => api().getToastsByPlacement(placement))

  const mergedProps = mergeProps(api().getGroupProps({ placement }), localProps)

  return (
    <ark.div {...mergedProps}>
      <For each={toasts()}>
        {(toast) => <ToastActor value={toast}>{(ctx) => toasterProps.children(ctx)}</ToastActor>}
      </For>
    </ark.div>
  )
}

interface ToastActorProps {
  value: toast.Service
  children: (ctx: Accessor<toast.Options<JSX.Element>>) => JSX.Element
}

const ToastActor = (props: ToastActorProps) => {
  const [state, send] = useActor(props.value)
  const api = createMemo(() => toast.connect(state, send, normalizeProps))
  const ctx = createMemo(() => state.context)
  return <ToastProvider value={api}>{props.children(ctx)}</ToastProvider>
}
