import type { PropsWithChildren } from 'react'
import { Toast } from './toast'
import { ToastCloseButton } from './toast-close-button'
import { ToastDescription } from './toast-description'
import { ToastGroup, ToastProvider, useToast } from './toast-provider'
import { ToastTitle } from './toast-title'

// chakra land
export const ChakraToastProivder = (props: PropsWithChildren) => (
  <ToastProvider
    render={(placments) =>
      placments.map((placement) => (
        <ToastGroup key={placement} placement={placement}>
          {(toasts) =>
            toasts.map((toast) => (
              <Toast key={toast.id} toast={toast}>
                <ToastTitle />
                <ToastDescription />
                <ToastCloseButton>Close</ToastCloseButton>
              </Toast>
            ))
          }
        </ToastGroup>
      ))
    }
  >
    {props.children}
  </ToastProvider>
)

// user land
export const Basic = () => (
  <ChakraToastProivder>
    <h1>Hello World</h1>
    <ExampleComponent />
  </ChakraToastProivder>
)

const ExampleComponent = () => {
  const toast = useToast()
  return (
    <div>
      <button
        onClick={() => {
          toast.create({ title: 'Hello', placement: 'bottom' })
        }}
      >
        Add top-right toast
      </button>
      <button
        onClick={() => {
          toast.create({
            title: 'Data submitted!',
            type: 'success',
            placement: 'bottom-start',
          })
        }}
      >
        Add bottom-right toast
      </button>
    </div>
  )
}
