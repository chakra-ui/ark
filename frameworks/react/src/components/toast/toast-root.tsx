import { mergeProps, normalizeProps, useActor } from '@zag-js/react'
import { type DefaultGenericOptions, type MachineContext, connect } from '@zag-js/toast'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { ToastProvider } from './use-toast-context'
import { useToasterContext } from './use-toaster-context'

interface ToastProps {
  toast: MachineContext<DefaultGenericOptions>
}

export interface ToastRootProps extends HTMLArkProps<'div'>, ToastProps {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>((props, ref) => {
  const [toastProps, localprops] = createSplitProps<ToastProps>()(props, ['toast'])
  const toasts = useToasterContext()
  const service = toasts.find((item) => item.state.context.id === toastProps.toast.id)

  if (!service) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, send] = useActor(service)
  const toast = connect(state, send, normalizeProps)
  const mergedProps = mergeProps(toast.rootProps, localprops)

  return (
    <ToastProvider value={toast}>
      <ark.div {...mergedProps} ref={ref} />
    </ToastProvider>
  )
})

ToastRoot.displayName = 'ToastRoot'
