import { mergeProps, normalizeProps, useActor, type PropTypes } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { forwardRef, useEffect, type JSX } from 'react'
import { useEnvironmentContext } from '../environment'
import { type HTMLArkProps } from '../factory'
import type { Optional } from '../types'
import { ToastProvider } from './toast-context'
import { ToastGroup } from './toast-group'

type GroupContext = Partial<toast.GroupMachineContext>

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'render'> {
  placement: toast.Placement
  render: (api: toast.Api<PropTypes>) => JSX.Element
}

export type CreateToasterReturn = [React.FC<HTMLArkProps<'ol'>>, toast.GroupApi<PropTypes>]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const { placement, ...rest } = props
  const service = toast.group.machine({ id: '1', placement, ...rest }).start()
  let api = toast.group.connect(service.getState(), service.send, normalizeProps)

  const Toaster = forwardRef<HTMLOListElement, HTMLArkProps<'ol'>>((props, ref) => {
    const getRootNode = useEnvironmentContext()
    const [state, send] = useActor(service)
    api = toast.group.connect(state, send, normalizeProps)

    useEffect(() => {
      service.setContext({ getRootNode })
      return () => void service.stop()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const mergedProps = mergeProps(api.getGroupProps({ placement }), props)
    const toasts = api.toastsByPlacement[placement] ?? []

    return (
      <ToastGroup {...mergedProps} ref={ref}>
        {toasts.map((toast) => (
          <ToastProviderFactory key={toast.id} service={toast} />
        ))}
      </ToastGroup>
    )
  })

  Toaster.displayName = 'ToastGroup'

  return [Toaster, api]
}

interface ToastProviderFactoryProps {
  service: toast.Service
}

const ToastProviderFactory = (props: ToastProviderFactoryProps) => {
  const [state, send] = useActor(props.service)
  const api = toast.connect(state, send, normalizeProps)

  return <ToastProvider value={api}>{state.context.render?.(api)}</ToastProvider>
}
