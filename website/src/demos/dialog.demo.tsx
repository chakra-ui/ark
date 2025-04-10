import { XIcon } from 'lucide-react'
import { Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { IconButton } from '~/components/ui/icon-button'

export const Demo = (props: Dialog.RootProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Stack gap="8" p="6">
            <Stack gap="1">
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog Description</Dialog.Description>
            </Stack>
            <Stack gap="3" justifyContent="flex-end" direction="row" width="full">
              <Dialog.CloseTrigger asChild>
                <Button variant="outline" width="auto">
                  Cancel
                </Button>
              </Dialog.CloseTrigger>
              <Button width="auto">Confirm</Button>
            </Stack>
          </Stack>
          <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
            <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
