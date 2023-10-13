import { createToaster } from '@ark-ui/react'
import { Box } from '@ark-ui/styled-system/jsx'
import { XIcon } from 'lucide-react'
import { Toast, ToastCloseTrigger, ToastDescription, ToastTitle } from '~/components/ui/toast'
import { Button } from '../ui/button'
import { IconButton } from '../ui/icon-button'

const [Toaster, toast] = createToaster({
  placement: 'bottom-end',
  max: 1,
  render() {
    return (
      <Toast>
        <ToastTitle />
        <ToastDescription />
        <Box position="absolute" top="3" right="3">
          <ToastCloseTrigger asChild>
            <IconButton size="sm" variant="link" aria-label="Close Toast">
              <XIcon />
            </IconButton>
          </ToastCloseTrigger>
        </Box>
      </Toast>
    )
  },
})

export const ToastDemo = () => {
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast.create({
            title: 'Hello',
            description: "I'm a toast",
          })
        }}
      >
        Add toast
      </Button>
      <Toaster />
    </>
  )
}
