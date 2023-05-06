import { Button } from '@/components/shared/Button'
import { CloseButton } from '@/components/shared/CloseButton'
import { Stack } from '@/panda/jsx'
import { dialog } from '@/panda/recipes'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Portal,
} from '@ark-ui/react'

export const DemoDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="primary" size="md">
        Open dialog
      </Button>
    </DialogTrigger>
    <Portal>
      <DialogBackdrop className={dialog()} />
      <DialogContainer className={dialog()}>
        <DialogContent>
          <Stack gap="8" p="6">
            <Stack gap="1">
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>Dialog Description</DialogDescription>
            </Stack>
            <Stack gap="3" direction="row" width="full">
              <DialogCloseTrigger asChild>
                <Button variant="secondary" size="md" width="full">
                  Cancel
                </Button>
              </DialogCloseTrigger>
              <Button variant="primary" size="md" width="full">
                Confirm
              </Button>
            </Stack>
          </Stack>
          <DialogCloseTrigger asChild>
            <CloseButton aria-label="Close dialog" />
          </DialogCloseTrigger>
        </DialogContent>
      </DialogContainer>
    </Portal>
  </Dialog>
)
