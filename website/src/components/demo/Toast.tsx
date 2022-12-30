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
            <ToastGroup key={placement} placement={placement} className={toastStyles()}>
              {(toasts) =>
                toasts.map((toast) => (
                  <Toast key={toast.id} toast={toast}>
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
                        <Button variant="link" size="sm" color="accent.default">
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
    <Button
      variant="primary"
      size="md"
      onClick={() => {
        toast.create({
          title: 'Hello',
          description: "I'm a toast",
          placement: 'bottom-end',
          removeDelay: 0,
        })
      }}
    >
      Add toast
    </Button>
  )
}
