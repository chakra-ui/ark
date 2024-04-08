import { mergeProps, normalizeProps, useActor, type PropTypes } from '@zag-js/react'
import type { DefaultGenericOptions, MachineContext } from '@zag-js/toast'
import * as toast from '@zag-js/toast'
import { forwardRef, useEffect, type ComponentProps, type ReactNode } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Assign, Optional } from '../types'
import { ToasterProvider } from './use-toaster-context'

type GroupContext = Partial<toast.GroupMachineContext>

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'render'> {
  placement: toast.Placement
}

export type ToasterProps = Assign<
  ComponentProps<'div'>,
  {
    children: (context: MachineContext<DefaultGenericOptions>[]) => ReactNode
  }
>

export type CreateToasterReturn = [React.FC<ToasterProps>, toast.GroupApi<PropTypes>]

export const createToaster = (props: CreateToasterProps) => {
  const { placement, ...rest } = props
  const service = toast.group.machine({ id: '1', placement, ...rest }).start()
  const context = toast.group.connect(service.getState(), service.send, normalizeProps)

  const subscribe = (fn: CallableFunction) => {
    // @ts-expect-error - The context is not typed
    return service.subscribe((state) => fn(state.context.toasts))
  }

  const Toaster = forwardRef<HTMLDivElement, ToasterProps>((props, ref) => {
    const getRootNode = useEnvironmentContext()
    const [state, send] = useActor(service)
    const context = toast.group.connect(state, send, normalizeProps)

    useEffect(() => {
      service.setContext({ getRootNode })
      return () => void service.stop()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const mergedProps = mergeProps(context.getGroupProps({ placement: placement }), props)

    return (
      <ToasterProvider value={{ api: context, placement, service }}>
        <div {...mergedProps} ref={ref}>
          {/* @ts-expect-error it exsits */}
          {props.children(state.context.toasts.map((item) => item.state.context))}
        </div>
      </ToasterProvider>
    )
  })

  Toaster.displayName = 'Toaster'

  const api = {} as toast.GroupApi<PropTypes>
  for (const key in context) {
    Object.defineProperty(api, key, {
      get() {
        if (key === 'subscribe') return subscribe
        const ctx = toast.group.connect(service.getState(), service.send, normalizeProps)
        return ctx[key as keyof typeof context]
      },
    })
  }

  return [Toaster, api] as const
}
