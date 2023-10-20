import { createToaster } from '@ark-ui/react'
import { XIcon } from 'lucide-react'
import { Box } from 'styled-system/jsx'
import { Toast, ToastCloseTrigger, ToastDescription, ToastTitle } from '~/components/ui/toast'
import { Button } from '../components/ui/button'
import { IconButton } from '../components/ui/icon-button'

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
