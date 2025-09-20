import { BottomSheet } from '@ark-ui/react/bottom-sheet'

export const Scrollable = () => (
  <BottomSheet.Root>
    <BottomSheet.Trigger>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop />
    <BottomSheet.Content>
      <BottomSheet.Grabber>
        <BottomSheet.GrabberIndicator />
      </BottomSheet.Grabber>
      <BottomSheet.Title>Scrollable Bottom Sheet</BottomSheet.Title>
      <BottomSheet.CloseTrigger>Close</BottomSheet.CloseTrigger>
      <div className="scrollable">
        {Array.from({ length: 100 }).map((_element, index) => (
          <div key={index}>Item {index}</div>
        ))}
      </div>
    </BottomSheet.Content>
  </BottomSheet.Root>
)
