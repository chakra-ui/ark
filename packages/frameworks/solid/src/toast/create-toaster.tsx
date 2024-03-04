import { mergeProps, normalizeProps, useActor, type PropTypes } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { Index, createEffect, createMemo, onCleanup, type Accessor, type JSX } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type HTMLArkProps } from '../factory'
import type { Optional } from '../types'
import { ToastProvider, type Options } from './toast-context'
import { ToastGroup } from './toast-group'

type GroupContext = Partial<toast.GroupMachineContext>

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'render'> {
  placement: toast.Placement
  render: (api: Accessor<toast.Api<PropTypes, Options>>) => JSX.Element
}

export type CreateToasterReturn = [
  (props: HTMLArkProps<'ol'>) => JSX.Element,
  Accessor<toast.GroupApi<PropTypes, Options>>,
]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const service = toast.group.machine<Options>({ id: '1', ...props }).start()
  const [state, send] = useActor(service)
  const api = createMemo(() => toast.group.connect(state, send, normalizeProps))

  const subscribe = (fn: CallableFunction) => {
    // @ts-expect-error FIX LATER IT EXISTS
    return service.subscribe((state) => fn(state.context.toasts))
  }

  const Toaster = (toasterProps: HTMLArkProps<'ol'>) => {
    const getRootNode = useEnvironmentContext()

    createEffect(() => {
      service.setContext({ getRootNode })
      onCleanup(() => service.stop())
    })

    const mergedProps = mergeProps(
      () => api().getGroupProps({ placement: props.placement }),
      toasterProps,
    )

    return (
      <ToastGroup {...mergedProps}>
        <Index each={api().toastsByPlacement[props.placement]}>
          {(toast) => <ToastProviderFactory service={toast()} />}
        </Index>
      </ToastGroup>
    )
  }

  return [Toaster, createMemo(() => Object.assign(api(), { subscribe }))]
}

interface ToastProviderFactoryProps {
  service: toast.Service<Options>
}

const ToastProviderFactory = (props: ToastProviderFactoryProps) => {
  const [state, send] = useActor(props.service)
  const api = createMemo(() => toast.connect(state, send, normalizeProps))

  return <ToastProvider value={api}>{state.context.render?.(api)}</ToastProvider>
}
