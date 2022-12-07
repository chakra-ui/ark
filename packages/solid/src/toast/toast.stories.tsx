import type { JSX } from 'solid-js'
import { Toast } from './toast'
import { ToastCloseTrigger } from './toast-close-trigger'
import { ToastDescription } from './toast-description'
import { ToastGroup } from './toast-group'
import { ToastPlacements } from './toast-placements'
import { ToastProvider, useToast } from './toast-provider'
import { ToastTitle } from './toast-title'

// chakra land
export const ChakraToastProvider = (props: { children: JSX.Element }) => (
  <ToastProvider>
    <ToastPlacements>
      {(placements) =>
        placements.map((placement) => (
          <ToastGroup placement={placement}>
            {(toasts) =>
              toasts.map((toast) => (
                <Toast toast={toast}>
                  <ToastTitle />
                  <ToastDescription />
                  <ToastCloseTrigger>
                    <button>close</button>
                  </ToastCloseTrigger>
                </Toast>
              ))
            }
          </ToastGroup>
        ))
      }
    </ToastPlacements>
    {props.children}
  </ToastProvider>
)

// user land
export const Basic = () => (
  <ChakraToastProvider>
    <h1>Hello World</h1>
    <ExampleComponent />
  </ChakraToastProvider>
)

const ExampleComponent = () => {
  const toast = useToast()
  return (
    <div>
      <button
        onClick={() => {
          toast().create({
            title: 'Hello',
            placement: 'top-end',
            duration: 10000,
            removeDelay: 0,
          })
        }}
      >
        Add top-end toast
      </button>
      <button
        onClick={() => {
          toast().create({
            title: 'Data submitted!',
            type: 'success',
            placement: 'bottom-start',
          })
        }}
      >
        Add bottom-start toast
      </button>
    </div>
  )
}
