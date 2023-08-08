import type { Meta } from '@storybook/react'
import { Toast, useToast, type ToastProviderProps } from '.'
import './toast.css'

type ToastType = typeof Toast

const meta: Meta<ToastType> = {
  title: 'Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <AppToastProvider>
        <Story />
      </AppToastProvider>
    ),
  ],
}

export default meta

export const AppToastProvider = (props: ToastProviderProps) => {
  const { children, ...rest } = props
  return (
    <Toast.Provider {...rest}>
      <Toast.Placements>
        {(placements) =>
          placements.map((placement) => (
            <Toast.Group key={placement} placement={placement}>
              {(toasts) =>
                toasts.map((toast) => (
                  <Toast.Root key={toast.id} toast={toast}>
                    <Toast.Title />
                    <Toast.Description />
                    <Toast.CloseTrigger>close</Toast.CloseTrigger>
                  </Toast.Root>
                ))
              }
            </Toast.Group>
          ))
        }
      </Toast.Placements>
      {children}
    </Toast.Provider>
  )
}
export const App = () => <AppToastProvider>{/* Your App */}</AppToastProvider>

export const SimpleToast = () => {
  const toast = useToast()
  return (
    <button
      onClick={() => {
        toast.create({
          title: 'Hello',
          description: 'This is a toast',
        })
      }}
    >
      Add Toast
    </button>
  )
}

export const ConfigureToast = () => {
  const toast = useToast()
  return (
    <button
      onClick={() => {
        toast.create({
          title: 'Success',
          description: 'This is a success toast',
          type: 'success',
          placement: 'bottom-start',
          duration: 20000,
          removeDelay: 250,
        })
      }}
    >
      Add Toast
    </button>
  )
}

export const CustomRenderToast = () => {
  const toast = useToast()
  return (
    <button
      onClick={() => {
        toast.create({
          title: 'Please checkout',
          render: (toast) => (
            <div>
              {toast.title} <a href="https://ark-ui.com">Ark UI</a>
            </div>
          ),
        })
      }}
    >
      Add Toast
    </button>
  )
}

export const DefaultOptions = () => (
  <AppToastProvider defaultOptions={{ duration: 2000, placement: 'top-end', removeDelay: 250 }}>
    {/* ... */}
  </AppToastProvider>
)
