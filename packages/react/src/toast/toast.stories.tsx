import type { Meta } from '@storybook/react'
import { type PropsWithChildren } from 'react'
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastGroup,
  ToastPlacements,
  ToastProvider,
  ToastTitle,
  useToast,
} from '.'

type ToastType = typeof Toast

const meta: Meta<ToastType> = {
  title: 'Toast',
  component: Toast,
}

export default meta

// chakra land
export const ChakraToastProvider = (props: PropsWithChildren) => (
  <ToastProvider>
    <ToastPlacements>
      {(placements) =>
        placements.map((placement) => (
          <ToastGroup key={placement} placement={placement}>
            {(toasts) =>
              toasts.map((toast) => (
                <Toast key={toast.id} toast={toast}>
                  <ToastTitle />
                  <ToastDescription />
                  <ToastCloseTrigger>close</ToastCloseTrigger>
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
          toast.create({
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
          toast.create({
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
