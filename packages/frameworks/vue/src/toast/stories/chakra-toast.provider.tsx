import { defineComponent } from 'vue'
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastGroup,
  ToastProvider,
  ToastTitle,
} from '..'
import type { ToastsContext } from '../toast-group'
import { ToastPlacements, type PlacementsContext } from '../toast-placements'

export const ChakraToastProvider = defineComponent((_, { slots }) => {
  return () => (
    <ToastProvider>
      <ToastPlacements>
        {({ placements }: { placements: PlacementsContext['placements'] }) => (
          <>
            {placements.map((placement) => (
              <ToastGroup placement={placement} key={placement}>
                {{
                  default: ({ toasts }: { toasts: ToastsContext['toasts'] }) => (
                    <>
                      {toasts.map((toast) => (
                        <Toast key={toast.id} toast={toast}>
                          <ToastTitle />
                          <ToastDescription />
                          <ToastCloseTrigger>
                            <button>Close</button>
                          </ToastCloseTrigger>
                        </Toast>
                      ))}
                    </>
                  ),
                }}
              </ToastGroup>
            ))}
          </>
        )}
      </ToastPlacements>
      {slots.default?.()}
    </ToastProvider>
  )
})
