import { mergeProps, normalizeProps, useMachine } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { type ReactNode, forwardRef, useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { CreateToasterReturn } from './create-toaster'
import { ToastProvider } from './use-toast-context'

export type ToastOptions = toast.Options<ReactNode>

export interface ToasterBaseProps extends PolymorphicProps, Omit<toast.GroupProps, 'store' | 'id'> {
  toaster: CreateToasterReturn
  children: (toast: ToastOptions) => ReactNode
}

export interface ToasterProps extends Assign<HTMLProps<'div'>, ToasterBaseProps> {}

export const Toaster = forwardRef<HTMLDivElement, ToasterProps>((props, ref) => {
  const { toaster, children, ...localProps } = props

  const locale = useLocaleContext()
  const env = useEnvironmentContext()

  const service = useMachine(toast.group.machine, {
    store: toaster,
    id: useId(),
    dir: locale?.dir,
    getRootNode: env?.getRootNode,
  })

  const api = toast.group.connect(service, normalizeProps)

  const mergedProps = mergeProps(api.getGroupProps(), localProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {api.getToasts().map((toast, index) => (
        <ToastActor key={toast.id} value={toast} parent={service} index={index}>
          {(ctx) => children(ctx)}
        </ToastActor>
      ))}
    </ark.div>
  )
})

Toaster.displayName = 'Toaster'

interface ToastActorProps {
  value: toast.Props<ReactNode>
  parent: toast.GroupService
  index: number
  children: (ctx: toast.Options<ReactNode>) => ReactNode
}

const ToastActor = (props: ToastActorProps) => {
  const env = useEnvironmentContext()
  const localProps = {
    ...props.value,
    parent: props.parent,
    index: props.index,
    getRootNode: env.getRootNode,
  }

  const service = useMachine(toast.machine, { ...localProps })
  const api = toast.connect(service, normalizeProps)
  return <ToastProvider value={api}>{props.children(props.value)}</ToastProvider>
}

ToastActor.displayName = 'ToastActor'
