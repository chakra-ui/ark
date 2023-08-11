import { Portal } from '@ark-ui/react'
import { FiX } from 'react-icons/fi'
import { Box, Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import { IconButton } from '~/components/ui/icon-button'
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastGroup,
  ToastPlacements,
  ToastProvider,
  ToastTitle,
  useToast,
} from '~/components/ui/toast'

export const ToastDemo = () => {
  return (
    <ToastProvider max={1}>
      <Portal>
        <ToastPlacements>
          {(placements) =>
            placements.map((placement) => (
              <ToastGroup key={placement} placement={placement}>
                {(toasts) =>
                  toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast}>
                      <Stack gap="4">
                        <Stack gap="1">
                          <ToastTitle />
                          <ToastDescription />
                        </Stack>
                        <Stack direction="row" gap="3">
                          <ToastCloseTrigger asChild>
                            <Button variant="link" size="sm">
                              Dismiss
                            </Button>
                          </ToastCloseTrigger>
                          <Button variant="link" size="sm">
                            Show
                          </Button>
                        </Stack>
                      </Stack>
                      <Box position="absolute" top="3" right="3">
                        <ToastCloseTrigger asChild>
                          <IconButton size="sm" variant="link" aria-label="Close Toast">
                            <FiX />
                          </IconButton>
                        </ToastCloseTrigger>
                      </Box>
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
}

const DemoToastWrapper = () => {
  const toast = useToast()

  return (
    <Button
      variant="secondary"
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
