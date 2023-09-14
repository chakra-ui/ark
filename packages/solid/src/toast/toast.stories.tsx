import { children } from 'solid-js'
import { For } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastGroup,
  ToastPlacements,
  ToastProvider,
  ToastTitle,
  useToast,
  type ToastProviderProps,
} from './'
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
  const getChildren = children(() => props.children)
  return (
    <ToastProvider {...props}>
      <ToastPlacements>
        {(placements) => (
          <For each={placements()}>
            {(placement) => (
              <ToastGroup placement={placement}>
                {(toasts) => (
                  <For each={toasts()}>
                    {(toast) => (
                      <Toast toast={toast}>
                        <ToastTitle />
                        <ToastDescription />
                        <ToastCloseTrigger>Close</ToastCloseTrigger>
                      </Toast>
                    )}
                  </For>
                )}
              </ToastGroup>
            )}
          </For>
        )}
      </ToastPlacements>
      {getChildren()}
    </ToastProvider>
  )
}
export const App = () => <AppToastProvider>{/* Your App */}</AppToastProvider>

export const SimpleToast = () => {
  const toast = useToast()
  return (
    <button
      onClick={() => {
        toast().create({
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
        toast().create({
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
        toast().create({
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
