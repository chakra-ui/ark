import { mergeProps, normalizeProps, useActor, type PropTypes } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { Index, Show, createEffect, createMemo, onCleanup, type Accessor, type JSX } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { ark, type HTMLArkProps } from '../factory'
import type { Optional } from '../types'
import { ToastProvider } from './toast-context'

// TODO simplify types after next zag.js upgrade
type GroupContext = Parameters<(typeof toast)['group']['machine']>[0]

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'defaultOptions'> {
  placement: toast.Placement
  render: (api: Accessor<toast.Api>) => JSX.Element
}

export type CreateToasterReturn = [
  (props: HTMLArkProps<'ol'>) => JSX.Element,
  Accessor<toast.GroupApi<PropTypes>>,
]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const { placement, render, ...rest } = props
  const service = toast.group.machine({ id: '1', defaultOptions: { placement }, ...rest }).start()
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
          {(toast) => <ToastProviderFactory toast={toast()} render={render} />}
        </Index>
      </ark.ol>
    )
  }

  return [Toaster, api]
}

interface ToastProviderFactoryProps {
  toast: toast.Service
  render: (api: Accessor<toast.Api>) => JSX.Element
}

const ToastProviderFactory = (props: ToastProviderFactoryProps) => {
  const [state, send] = useActor(props.toast)
  const api = createMemo(() => toast.connect(state, send, normalizeProps))

  return (
    <ToastProvider value={api}>
      <Show when={state.context.render} fallback={props.render(api)}>
        {api().render()}
      </Show>
    </ToastProvider>
  )
}
