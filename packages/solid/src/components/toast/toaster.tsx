import { Key, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { type Accessor, type JSX, createMemo, createUniqueId, splitProps } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { CreateToasterReturn } from './create-toaster'
import { ToastProvider } from './use-toast-context'

export interface ToasterBaseProps extends PolymorphicProps<'div'>, Omit<toast.GroupProps, 'id' | 'store'> {
  toaster: CreateToasterReturn
  children: (toast: Accessor<toast.Options<JSX.Element>>) => JSX.Element
}
export interface ToasterProps extends Assign<HTMLProps<'div'>, ToasterBaseProps> {}

export const Toaster = (props: ToasterProps) => {
  const [toasterProps, localProps] = splitProps(props, ['toaster', 'children'])

  const locale = useLocaleContext()
  const env = useEnvironmentContext()

  const service = useMachine(toast.group.machine, () => ({
    store: toasterProps.toaster,
    id: createUniqueId(),
    dir: locale()?.dir,
    getRootNode: env()?.getRootNode,
  }))

  const api = createMemo(() => toast.group.connect(service, normalizeProps))
  const toasts = createMemo(() => api().getToasts())

  const mergedProps = mergeProps(() => api().getGroupProps(), localProps)

  return (
    <ark.div {...mergedProps}>
      <Key each={toasts()} by="id">
        {(toast, index) => (
          <ToastActor value={toast} index={index} parent={service}>
            {(ctx) => toasterProps.children(ctx)}
          </ToastActor>
        )}
      </Key>
    </ark.div>
  )
}

interface ToastActorProps {
  value: Accessor<toast.Options<JSX.Element>>
  parent: toast.GroupService
  index: Accessor<number>
  children: (ctx: Accessor<toast.Options<JSX.Element>>) => JSX.Element
}

const ToastActor = (props: ToastActorProps) => {
  const env = useEnvironmentContext()
  const localProps = createMemo(() => ({
    ...props.value(),
    parent: props.parent,
    index: props.index(),
    getRootNode: env().getRootNode,
  }))

  const service = useMachine(toast.machine, localProps)
  const api = createMemo(() => toast.connect(service, normalizeProps))
  return <ToastProvider value={api}>{props.children(props.value)}</ToastProvider>
}
