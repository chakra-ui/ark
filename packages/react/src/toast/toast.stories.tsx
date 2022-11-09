import type { PropsWithChildren } from 'react'
import { Toast } from './toast'
import { ToastCloseButton } from './toast-close-button'
import { ToastDescription } from './toast-description'
import { ToastProvider } from './toast-provider'
import { ToastTitle } from './toast-title'
import { useToast } from './use-toast'

// chakra land
export const ChakraToastProivder = (props: PropsWithChildren) => {
  return (
    <ToastProvider
      render={(toasts) => (
        <>
          {toasts.map((toast) => (
            <Toast key={toast.id} actor={toast}>
              <ToastTitle />
              <ToastDescription />
              <ToastCloseButton />
            </Toast>
          ))}
        </>
      )}
    >
      {props.children}
    </ToastProvider>
  )
}

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
