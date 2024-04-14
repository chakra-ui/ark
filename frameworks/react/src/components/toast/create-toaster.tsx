import { type PropTypes, mergeProps, normalizeProps, useActor } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { type JSX, forwardRef } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEffectOnce } from '../../utils/use-effect-once'
import type { HTMLArkProps } from '../factory'
import { ToastGroup } from './toast-group'
import { ToastProvider } from './use-toast-context'

type GroupContext = Partial<toast.GroupMachineContext>

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'render'> {
  placement: toast.Placement
  render: (context: toast.Api<PropTypes>) => JSX.Element
}

export type CreateToasterReturn = [React.FC<HTMLArkProps<'ol'>>, toast.GroupApi<PropTypes>]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const { placement, ...rest } = props
  const service = toast.group.machine({ id: '1', placement, ...rest }).start()
  let context = toast.group.connect(service.getState(), service.send, normalizeProps)

  const subscribe = (fn: CallableFunction) => {
    // @ts-expect-error FIX LATER IT EXISTS
    return service.subscribe((state) => fn(state.context.toasts))
  }

  const Toaster = forwardRef<HTMLOListElement, HTMLArkProps<'ol'>>((props, ref) => {
    const getRootNode = useEnvironmentContext()
    const [state, send] = useActor(service)
    context = toast.group.connect(state, send, normalizeProps)

    useEffectOnce(() => {
      service.setContext({ getRootNode })
      return () => void service.stop()
    })

    const mergedProps = mergeProps(context.getGroupProps({ placement }), props)
    const toasts = context.toastsByPlacement[placement] ?? []

    return (
      <ToastGroup {...mergedProps} ref={ref}>
        {toasts.map((toast) => (
          <ToastProviderFactory key={toast.id} service={toast} />
        ))}
      </ToastGroup>
    )
  })

  Toaster.displayName = 'ToastGroup'

  return [Toaster, Object.assign(context, { subscribe })]
}

interface ToastProviderFactoryProps {
  service: toast.Service
}

const ToastProviderFactory = (props: ToastProviderFactoryProps) => {
  const [state, send] = useActor(props.service)
  const context = toast.connect(state, send, normalizeProps)

  return <ToastProvider value={context}>{state.context.render?.(context)}</ToastProvider>
}
