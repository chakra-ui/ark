import { Stack } from '@/panda/jsx'
import { toast as toastStyles } from '@/panda/recipes'
import {
  Portal,
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastGroup,
  ToastPlacements,
  ToastProvider,
  ToastTitle,
  useToast,
} from '@ark-ui/react'
import { Button } from '../shared/Button'
import { CloseButton } from '../shared/CloseButton'

export const DemoToast = () => (
  <ToastProvider>
    <Portal>
      <ToastPlacements>
        {(placements) =>
          placements.map((placement) => (
            <ToastGroup key={placement} placement={placement}>
              {(toasts) =>
                toasts.map((toast) => (
                  <Toast key={toast.id} toast={toast} className={toastStyles()}>
                    <Stack gap="4">
                      <Stack gap="1">
                        <ToastTitle />
                        <ToastDescription />
                      </Stack>
                      <Stack direction="row" gap="3">
                        <ToastCloseTrigger>
                          <Button variant="link" size="sm">
                            Dismiss
                          </Button>
                        </ToastCloseTrigger>
                        <Button variant="link" size="sm">
                          Show
                        </Button>
                      </Stack>
                    </Stack>
                    <ToastCloseTrigger>
                      <CloseButton aria-label="Close tooltip" size="sm" variant="link" />
                    </ToastCloseTrigger>
                  </Toast>
                ))
              }
            </ToastGroup>
          ))
        }
      </ToastPlacements>
    </Portal>
    <DemoToastWrapper />
  </ToastProvider>
)

const DemoToastWrapper = () => {
  const toast = useToast()
  return (
    <div>
      <button
        onClick={() => {
          toast.create({
            title: 'Hello',
            description: "I'm a toast",
            placement: 'top-end',
            duration: 10000000,
            removeDelay: 0,
          })
        }}
      >
        Add top-end toast
      </button>
    </div>
  )
}
