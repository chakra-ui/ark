import { type PropTypes, mergeProps, normalizeProps, useActor, useMachine } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { type ComponentProps, type ReactNode, forwardRef, useId } from 'react'
import type { Assign, Optional } from '../../types'
import { ToasterProvider } from './use-toaster-context'

type GroupContext = Partial<toast.GroupMachineContext>

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'render'> {
  placement: toast.Placement
}

export type ToasterProps = Assign<
  ComponentProps<'div'>,
  {
    children: (context: toast.Api<PropTypes, any>[]) => ReactNode
  }
>

export type CreateToasterReturn = [React.FC<ToasterProps>, toast.GroupApi<PropTypes>]

export const createToaster = (props: CreateToasterProps) => {
  const { placement, ...rest } = props

  const Toaster = forwardRef<HTMLDivElement, ToasterProps>((props, ref) => {
    const [state, send] = useMachine(
      toast.group.machine({
        id: useId(),
        placement,
        removeDelay: 200,
      }),
    )

    const api = toast.group.connect(state, send, normalizeProps)
    const toastsByPlacement = api.getToastsByPlacement()

    const toasts = toastsByPlacement[placement] ?? []

    const foo = toasts.map((actor) => {
      const [state, send] = useActor(actor)
      return toast.connect(state, send, normalizeProps)
    })

    return (
      <ToasterProvider value={foo}>
        <div {...api.getGroupProps({ placement })} ref={ref}>
          {props.children(foo)}
        </div>
      </ToasterProvider>
    )
  })

  Toaster.displayName = 'Toaster'

  return Toaster
}
