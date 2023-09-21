import { Portal } from '@ark-ui/react'
import { X } from 'lucide-react'
import { Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { IconButton } from '~/components/ui/icon-button'

export const DialogDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <Portal>
        <DialogBackdrop />
        <DialogContainer>
          <DialogContent>
            <Stack gap="8" p="6">
              <Stack gap="1">
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>Dialog Description</DialogDescription>
              </Stack>
              <Stack gap="3" direction="row" width="full">
                <DialogCloseTrigger asChild>
                  <Button variant="outline" width="full">
                    Cancel
                  </Button>
                </DialogCloseTrigger>
                <Button width="full">Confirm</Button>
              </Stack>
            </Stack>
            <DialogCloseTrigger asChild position="absolute" top="2" right="2">
              <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
                <X />
              </IconButton>
            </DialogCloseTrigger>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  )
}
