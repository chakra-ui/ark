import { BottomSheet } from '@ark-ui/solid/bottom-sheet'
import { For } from 'solid-js'

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
      <div class="scrollable">
        <For each={Array.from({ length: 100 })}>{(_element, index) => <div>Item {index()}</div>}</For>
      </div>
    </BottomSheet.Content>
  </BottomSheet.Root>
)
