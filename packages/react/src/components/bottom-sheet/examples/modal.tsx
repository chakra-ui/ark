import { BottomSheet } from '@ark-ui/react/bottom-sheet'

export const Modal = () => (
  <BottomSheet.Root modal>
    <BottomSheet.Trigger>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop />
    <BottomSheet.Content>
      <BottomSheet.Grabber>
        <BottomSheet.GrabberIndicator />
      </BottomSheet.Grabber>
      <BottomSheet.Title>Modal Bottom Sheet</BottomSheet.Title>
      <BottomSheet.CloseTrigger>Close</BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
)
