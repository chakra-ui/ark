import { BottomSheet } from '@ark-ui/solid/bottom-sheet'

export const NonDraggable = () => (
  <BottomSheet.Root>
    <BottomSheet.Trigger>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop />
    <BottomSheet.Content draggable={false}>
      <BottomSheet.Grabber>
        <BottomSheet.GrabberIndicator />
      </BottomSheet.Grabber>
      <BottomSheet.Title>Bottom Sheet Title</BottomSheet.Title>
      <p>This is the content of the bottom sheet.</p>
      <BottomSheet.CloseTrigger>Close</BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
)
