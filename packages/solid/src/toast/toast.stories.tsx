import { For, type JSX } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Toast } from './toast'
import { ToastCloseTrigger } from './toast-close-trigger'
import { ToastDescription } from './toast-description'
import { ToastGroup } from './toast-group'
import { ToastPlacements } from './toast-placements'
import { ToastProvider, useToast } from './toast-provider'
import { ToastTitle } from './toast-title'

const meta: Meta = {
  title: 'Toast',
}

export default meta

const Provider = (props: { children: JSX.Element }) => (
  <ToastProvider>
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
    {props.children}
  </ToastProvider>
)

// user land
export const Basic = () => (
  <Provider>
    <h1>Hello World</h1>
    <ExampleComponent />
  </Provider>
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
