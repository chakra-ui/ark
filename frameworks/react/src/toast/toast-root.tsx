import { mergeProps, normalizeProps, useActor } from '@zag-js/react'
import * as zagToast from '@zag-js/toast'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useToasterContext } from './use-toaster-context'
import { ToasterItemProvider } from './use-toaster-item-context'

export interface ToastRootProps extends HTMLArkProps<'div'> {
  toast: zagToast.MachineContext<zagToast.DefaultGenericOptions>
}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>((props, ref) => {
  const { toast, ...localprops } = props
  const { api, placement } = useToasterContext()

  const service = (api.toastsByPlacement[placement] ?? []).find(
    (item) => item.state.context.id === toast.id,
  )
  if (!service) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, send] = useActor(service)

  const context = zagToast.connect(state, send, normalizeProps)
  const mergedProps = mergeProps(context.rootProps, localprops)

  return (
    <ToasterItemProvider value={context}>
      <ark.div {...mergedProps} ref={ref} />
    </ToasterItemProvider>
  )
})

ToastRoot.displayName = 'ToastRoot'
