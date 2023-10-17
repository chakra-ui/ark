import { mergeProps, normalizeProps, useActor, type PropTypes } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import React, { forwardRef, useEffect } from 'react'
import { useEnvironmentContext } from '../environment'
import { ark, type HTMLArkProps } from '../factory'
import type { Optional } from '../types'
import { ToastProvider } from './toast-context'

// TODO simplify types after next zag.js upgrade
type GroupContext = Parameters<(typeof toast)['group']['machine']>[0]

export interface CreateToasterProps extends Omit<Optional<GroupContext, 'id'>, 'defaultOptions'> {
  placement: toast.Placement
  render: (api: toast.Api) => JSX.Element
}

export type CreateToasterReturn = [React.ElementType, toast.GroupApi<PropTypes>]

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  const { placement, render, ...rest } = props
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
      <ark.ol {...mergedProps} ref={ref}>
        {toasts.map((toast) => (
          <ToastProviderFactory key={toast.id} toast={toast} render={render} />
        ))}
      </ark.ol>
    )
  })

  Toaster.displayName = 'ToastGroup'

  return [Toaster, api]
}

interface ToastProviderFactoryProps {
  toast: toast.Service
  render: (api: toast.Api) => JSX.Element
}

const ToastProviderFactory = (props: ToastProviderFactoryProps) => {
  const [state, send] = useActor(props.toast)
  const api = toast.connect(state, send, normalizeProps)

  return <ToastProvider value={api}>{props.render(api)}</ToastProvider>
}
