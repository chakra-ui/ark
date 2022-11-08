import { normalizeProps, useMachine } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { createContext, PropsWithChildren, useContext, useId } from 'react'
import { Toast } from './toast'
import { ToastCloseButton } from './toast-close-button'
import { ToastDescription } from './toast-description'
import { ToastTitle } from './toast-title'

const ToastContext = createContext<any>(null)
export const useToast = () => useContext(ToastContext)
export type ToastProviderProps = PropsWithChildren

export const ToastProvider = (props: ToastProviderProps) => {
  const [state, send] = useMachine(toast.group.machine({ id: useId() }))
  const api = toast.group.connect(state, send, normalizeProps)

  return (
    <ToastContext.Provider value={api}>
      {Object.entries(api.toastsByPlacement).map(([placement, toasts]) => (
        <div key={placement} {...api.getGroupProps({ placement })}>
          {toasts.map((toast) => {
            console.log('ToastProivder', toast.context)
            return (
              <Toast key={toast.id} actor={toast}>
                <ToastTitle />
                <ToastDescription />
                <ToastCloseButton />
              </Toast>
            )
          })}
        </div>
      ))}
      {props.children}
    </ToastContext.Provider>
  )
}
