import { mergeProps, normalizeProps, useActor, type PropTypes } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { Index, createEffect, createMemo, onCleanup, type Accessor, type JSX } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { ark, type HTMLArkProps } from '../factory'
import type { Optional } from '../types'
import { ToastProvider } from './toast-context'

type GroupContext = Partial<toast.GroupMachineContext>

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'render'> {
  placement: toast.Placement
  render: (api: toast.Api<PropTypes>) => JSX.Element
}

export type CreateToasterReturn = [
  (props: HTMLArkProps<'ol'>) => JSX.Element,
  Accessor<toast.GroupApi<PropTypes>>,
]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const { placement, ...rest } = props
  const service = toast.group.machine({ id: '1', placement, ...rest }).start()
  const [state, send] = useActor(service)
  const api = createMemo(() => toast.group.connect(state, send, normalizeProps))

  const Toaster = (props: HTMLArkProps<'ol'>) => {
    const getRootNode = useEnvironmentContext()

    createEffect(() => {
      service.setContext({ getRootNode })
      onCleanup(() => service.stop())
    })

    const mergedProps = mergeProps(() => api().getGroupProps({ placement }), props)

    return (
      <ark.ol {...mergedProps}>
        <Index each={api().toastsByPlacement[placement]}>
          {(toast) => <ToastProviderFactory service={toast()} />}
        </Index>
      </ark.ol>
    )
  }

  return [Toaster, api]
}

interface ToastProviderFactoryProps {
  service: toast.Service
}

const ToastProviderFactory = (props: ToastProviderFactoryProps) => {
  const [state, send] = useActor(props.service)
  const api = toast.connect(state, send, normalizeProps)

  return <ToastProvider value={createMemo(() => api)}>{state.context.render?.(api)}</ToastProvider>
}
