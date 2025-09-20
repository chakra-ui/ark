import { createSignal } from 'solid-js'
import { BottomSheet, type BottomSheetOpenChangeDetails } from '@ark-ui/solid/bottom-sheet'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <div>
        <button onClick={() => setOpen(!open())}>{open() ? 'Close' : 'Open'} Bottom Sheet</button>
        <p>Sheet is {open() ? 'open' : 'closed'}</p>
      </div>

      <BottomSheet.Root open={open()} onOpenChange={(details: BottomSheetOpenChangeDetails) => setOpen(details.open)}>
        <BottomSheet.Backdrop />
        <BottomSheet.Content>
          <BottomSheet.Grabber>
            <BottomSheet.GrabberIndicator />
          </BottomSheet.Grabber>
          <BottomSheet.Title>Controlled Bottom Sheet</BottomSheet.Title>
          <p>This bottom sheet is controlled via state.</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </BottomSheet.Content>
      </BottomSheet.Root>
    </>
  )
}
